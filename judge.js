// file system access
const fs = require("fs");

// sandboxing
const vm = require("vm");                       

// display utilities
const utils = require("./utils.js");

// test parser
const TestParser = require("./test-parser.js");

// sandbox
const Sandbox = require("./sandbox.js");

// Dodona types
const {Message, Submission, Tab, Context, TestCase, Test} = require("./dodona.js"); 

//
// new message types
// TODO: these types should get native Dodona-support to avoid HTML with 
//       Bootstrap dependencies in feedback JSON
//

// display message as a banner (crossing the entire width of the feedback table)
// NOTE: banner gets color coded based on the status (success, danger, ...)
function bannerMessage(description, status="success", options) {
    
    // options parameter is optional
    options = options || {};
    
    return new Message(Object.assign(
        options,
        {
            // TODO: description requires HTML encoding
            description: "<span class=\"label label-" + status + "\" style=\"display:block;text-align:left;\">" + description + "</span>",
            format: "html"
        }
    ));
    
}

// display message with a label and a description
// NOTE: label gets color coded based on the status (success, danger, ...)
function labeledMessage(label, description, status="success", options) {
    
    // options parameter is optional
    options = options || {};
    
    return new Message(Object.assign(
        options,
        {
            // TODO: label and description require HTML encoding
            description: "<span class=\"label label-" + status + "\">" + label + "</span>&nbsp;" + description,
            format: "html"
        }
    ));
    
}

// display message with a exception (possibly including stack trace)
function errorMessage(description, options) {
    
    // options parameter is optional
    options = options || {};
    
    // TODO: description requires HTML encoding
    description = description
        // apply HTML encoding
        // TODO: replace this poor man's version by a full encoding
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        // replace newline by line breaks
        .replace(/\n/g, "<br />")
        // link source code references
        .replace(
            /<code>:([0-9]+)/g,
            (match, row) => '<a href="#" class="tab-link" data-tab="code" data-line="' + row + '">' + match + '</a>'
        );
    
    return new Message(Object.assign(
        options,
            {
                description: '<div class="code wrong">' + description + "</div>",
                format: "html"
            }
        ));
    
}

//
// Judge
//

class Judge {
    
    constructor(testFile, options) {
        
        // options parameter is optional
        options = options || {};
        
        // start timing
        this.time_start = new Date();
        
        // extract options
        this.time_limit = options.time_limit || 10000;
        
        // setup data structure to which all test results will be added
        this.feedback = new TestParser().parse(
            testFile,
            { time_limit: this.timeRemaining }
        );
        
    }

    // compute time remaining for judge
    get timeRemaining() {
        
        // compute time left since start of judging
        return Math.max(this.time_limit - (new Date() - this.time_start), 1);
        
    }

    get stoppedProcessing() {
        
        // determine top-level status
        const status = this.feedback.getProperty("status");
        
        // define errors that stop further processing
        const criticalErrors = [
            "memory limit exceeded",
            "time limit exceeded",
            "compilation error",
        ];

        // determine whether or not processing of test cases has stopped
        return (
            // stop if critical errors occurred
            criticalErrors.includes(status) ||
            // stop if submission has messages (spurious channels)
            this.feedback.hasMessages()
        );
        
    }

    run(sourceFile) {
        
        // read script from file
        const script = fs.readFileSync(sourceFile, "utf8");
        
        // process test cases
        try {
            
            // default options for evaluating submitted source code and tests
            const options = {
                lineOffset: 0,
                columnOffset: 0,
                displayErrors: true,
                filename: "<code>",      // compilation already uses filename
            };
            
            // pre-compile submitted source code
            const code = new vm.Script(script, options);
            
            // run submitted code in sandbox to see if runtime errors occur 
            // NOTE: done only when code was correctly compiled
            this.evaluateCode(code, options, this.feedback);
            
            // evaluate each context of each tab
            // NOTE: done only when code was correctly compiled and executed
            for (let tab of this.feedback) {
                for (let context of tab) {
                    this.evaluateContext(code, options, context);
                }
            }        
            
        } catch (e) {
                            
            this.feedback
                // set feedback status to compilation error
                .setStatus("compilation error")
                // add message with compilation error (student version)
                .addMessage(bannerMessage("compilation error", "danger"))
                .addMessage(errorMessage(utils.displayError(e, true)))
                // add message with compilation error (staff version)
                .addMessage(bannerMessage(
                    "compilation error (staff version)", 
                    "danger", 
                    { permission: "staff"}
                ))
                .addMessage(errorMessage(
                    utils.displayError(e, false),
                    { permission: "staff"}
                ));
            
        }
        
        // lint source code
        // TODO: enable linting as soon as ESLint has been added to docker
        // this.lint(script);
        
        // output feedback
        // NOTE: includes final cleanups
        process.stdout.write(this.toString());
        
    }

    evaluateCode(code, options, testgroup, sandbox) {
        
        // stop if testgroup needs no further processing
        if (this.stoppedProcessing) {
            return;
        }
        
        // options parameter is optional
        options = options || {};
        // update filename to source code
        options.filename = "<code>";
        // update timeout based on remaining time for judging
        options.timeout = this.timeRemaining;
        
        // create new sandbox if none was provided
        sandbox = sandbox || new Sandbox();        
        
        // execute submitted code in sandbox
        const generated = sandbox.execute(code, options);
        
        // handle exceptions raised while executing code
        if ("exception" in generated) {
            
            // update status to (specific kind of) runtime error
            testgroup.setStatus(utils.statusError(generated.exception));
            
            if (!options.silent) {
                
                testgroup
                    // add message containing runtime error (student version)
                    .addMessage(bannerMessage("exception", "danger"))
                    .addMessage(errorMessage(utils.displayError(generated.exception, true)))
                    // add message containing runtime error (staff version)
                    .addMessage(bannerMessage(
                        "exception", 
                        "danger",
                        { permission: "staff" }
                    ))
                    .addMessage(errorMessage(
                        utils.displayError(generated.exception, false),
                        { permission: "staff" }
                    ));

            }
            
        }
        
        // handle spurious output generated while executing code
        // NOTE: return channel is evaluated; after all, if the last statement 
        //       of the code is an expression or an assignment (e.g. a function 
        //       assignment), the (assigned) expression is returned
        for (let channel of ["stdout", "stderr"]) {

            // skip "empty" channels
            if (channel in generated && generated[channel] !== "") {
                
                // update status to wrong answer
                testgroup.setStatus("wrong answer");
                
                if (!options.silent) {
                    
                    // add message containing wrong answer (student version)
                    testgroup
                        .addMessage(bannerMessage(channel, "danger"))
                        .addMessage(new Message({
                            description: generated[channel],
                            format: "code"
                        }));
                    
                }
                
            }
            
        }
        
    }

    evaluateContext(code, options, context) {
        
        // options parameter is optional
        options = options || {};
        // update filename to source code
        options.filename = "<code>";
        // update timeout based on remaining time for judging
        options.timeout = this.timeRemaining;

        // setup sandbox for execution of submitted source code and all test 
        // cases in the current context
        const sandbox = new Sandbox();

        // switch to silent mode
        const silent = options.silent;
        options.silent = true;
        
        // execute submitted source code in sandbox
        // NOTE: this should be safe due to the fact that we checked earlier if
        //       there was a runtime error and stopped processing if this were 
        //       the case (hence the use of silent mode)
        this.evaluateCode(code, options, context, sandbox);

        // restore original silence mode
        if (silent === undefined) {
            delete options.silent;
        } else {
            options.silent = silent;
        }

        // execute all test cases of context in the same sandbox
        for (let testcase of context) {
            this.evaluateTestCase(testcase, options, sandbox);
        }
        
    }
        
    evaluateTestCase(testcase, options, sandbox) {
        
        // stop if testcase needs no further processing
        if (this.stoppedProcessing) {
            return;
        }
        
        // extract information from testcase
        const statements = testcase.getProperty("description");
        
        // map testcase channels to corresponding tests
        let expected = {};
        for (let test of testcase) {
            expected[test.getProperty("data").channel] = test;
        }
        
        // options parameter is optional
        options = options || {};
        // update filename to source code
        options.filename = "<test>";
        // update timeout based on remaining time for judging
        options.timeout = this.timeRemaining;

        // create new sandbox if none was provided
        sandbox = sandbox || new Sandbox();        
        
        // execute submitted code in sandbox
        const generated = sandbox.execute(statements, options);
        
        // import module for checking equality of JavaScript objects
        const deepEqual = require("deep-equal");

        // evaluate return and exception channels
        if ("return" in generated) {
            
            // fetch expected return value
            const generated_result = generated["return"];

            if ("return" in expected) {
                
                // fetch information for evaluation
                const test = expected["return"];
                const evaluation = test.getProperty("data").evaluation;
                const comparison = evaluation.comparison || deepEqual;
                const args = evaluation.arguments;
                const expected_result = test.getProperty("expected");
                
                // compare expected and generated return values
                const correct = comparison.apply(
                    comparison, 
                    [expected_result, generated_result].concat(args)
                );
                
                // update test of return values
                test.setProperties({
                    status: correct ? "correct answer" : "wrong answer",
                    expected: (
                        multiline(expected_result) && multiline(generated_result)? 
                        expected_result : 
                        utils.display(expected_result)
                    ),
                    generated: (
                        multiline(expected_result) && multiline(generated_result) ? 
                        generated_result : 
                        utils.display(generated_result)
                    )
                });
                
                // report on spurious or missing newlines in multiline return
                if (multiline(expected_result) && multiline(generated_result)) {
                    
                    if (
                        expected_result.endsWith("\n") &&
                        expected_result.slice(0, -1) === generated_result
                    ) {
                        
                        // add message to highlight missing newline
                        test.addMessage(labeledMessage(
                            "error", 
                            "returned string misses trailing newline",
                            "danger"
                        ));
                        
                        
                    } else if (
                        generated_result.endsWith("\n") &&
                        generated_result.slice(0, -1) === expected_result
                    ) {
                        
                        // add message to highlight spurious newline
                        test.addMessage(labeledMessage(
                            "error", 
                            "returned string has spurious trailing newline",
                            "danger"
                        ));
                        
                    }
                    
                }
                
            } else {
                
                // add test for generated return value
                testcase.addTest(new Test({
                    status: "wrong answer",
                    generated: (
                        multiline(generated_result) ? 
                        generated_result : 
                        utils.display(generated_result)
                    ),
                    data: { channel: "return" }
                }));
                
                // update status of test of expected exception
                expected.exception.setStatus("wrong answer");            
                
            }
            
        } else {
            
            // fetch generated exception
            const generated_result = utils.displayError(generated.exception, true);

            // check whether exception is as expected
            if ("exception" in expected) {
            
                // fetch information for evaluation
                const test = expected.exception;
                const evaluation = test.getProperty("data").evaluation;
                const comparison = evaluation.comparison || deepEqual;
                const args = evaluation.arguments;
                const expected_result = test.getProperty("expected");

                // compare expected and generated return values
                const correct = comparison.apply(
                    comparison, 
                    [expected_result, utils.lineError(generated_result)].concat(args)
                );
                
                // update test of exceptions
                // NOTE: the entire cleaned up stack trace is shown to help the 
                //       user find where the exception was raised
                test.setProperties({
                    status: (
                        correct ? 
                        "correct answer" : 
                        utils.statusError(generated.exception)
                    ),
                    generated: generated_result
                });
                
            } else {
                
                // add test for generated exception
                testcase.addTest(new Test({
                    status: utils.statusError(generated.exception),
                    generated: generated_result,
                    data: { channel: "exception" }
                }));
                
                /*
                // staff version of exception for debugging purposes
                testcase
                    .addMessage(bannerMessage(
                        "exception (staff version)", 
                        "danger",
                        { permission: "staff"}
                    ))
                    .addMessage(errorMessage(
                        utils.displayError(generated.exception, false),
                        { permission: "staff"}
                    ));
                */
                
                // fetch information from expected return
                const test = expected["return"];
                const expected_result = test.getProperty("expected");
                
                // update test of expected return value
                test.setProperties({
                    status: "wrong answer",
                    expected: (
                        multiline(expected_result) ? 
                        expected_result : 
                        utils.display(expected_result)
                    )
                });
                
            }
            
        }

        // evaluate expected and generated output channels
        for (let channel of ["stdout", "stderr"]) {
            
            // fetch generated result on channel
            const generated_result = channel in generated ? generated[channel] : "";
            
            if (generated_result !== "" && !(channel in expected)) {
                
                // add test for unexpected output generated on channel
                testcase.addTest(new Test({
                    status: "wrong answer",
                    generated: generated_result,
                    data: { channel: channel }
                }));
                
            } else if (channel in expected){
                
                // fetch information for evaluation
                const test = expected[channel];
                const evaluation = test.getProperty("data").evaluation;
                const comparison = evaluation.comparison || deepEqual;
                const args = evaluation.arguments;
                const expected_result = test.getProperty("expected");
                
                // compare expected and generated output
                const correct = comparison.apply(
                    comparison, 
                    [expected_result, generated_result].concat(args)
                );
                
                // update test of output channel
                test.setProperties({
                    status: correct ? "correct answer" : "wrong answer",
                    generated: generated_result
                });

                // check for missing or spurious trailing newline
                if (
                    expected_result.endsWith("\n") &&
                    expected_result.slice(0, -1) === generated_result
                ) {
                    
                    // add message to highlight missing trailing newline
                    test.addMessage(labeledMessage(
                        "error", 
                        channel + " misses trailing newline",
                        "danger"
                    ));
                    
                } else if (
                    generated_result.endsWith("\n") &&
                    generated_result.slice(0, -1) === expected_result
                ) {
                    
                    // add message to highlight spurious trailing newline
                    test.addMessage(labeledMessage(
                        "error", 
                        channel + " has spurious trailing newline",
                        "danger"
                    ));
                    
                }
                    
            }
            
        }
        
        // add runtime metrics to testcase
        if ("runtime_metrics" in generated) {
            testcase.setProperty("runtime_metrics", generated.runtime_metrics);
        }

    }

    lint(code) {
        
        // import ESLint API
        const linter = require("eslint").linter;
        
        // read ESLINT configuration file
        const config = JSON.parse(fs.readFileSync("config.eslint.json", "utf8"));
        
        // lint source code
        const messages = linter.verify(
            code, 
            config,
            {
                // avoid suppression of linting messages in submitted source code
                allowInlineConfig: false
            }
        );
        
        // add linter messages as feedback (if any)
        if (messages.length > 0) {
            
            // add new code tab
            this.feedback.addTab(new Tab({
                description: "code",
                data: {
                    // NOTE: for now, messages as generated by ESLint are passed 
                    //       on to the JSON output as is
                    annotations: messages.map(messages => messages)
                }
            }));
            
        }
        
    }

    toString() {
        
        let badgeCount;
        let timings = [0.0, 0.0, 0.0];
        let hasTimings = [false, false, false];
        
        // single-pass to update/complete some of the information
        for (let tab of this.feedback) {

            // initialize badge count of tab
            badgeCount = 0;
            
            // initialize timing of tab
            timings[1] = 0.0;
            hasTimings[1] = false;
            
            for (let context of tab) {
                
                // initialize timing of tab
                timings[2] = 0.0;
                hasTimings[2] = false;
                
                for (let testcase of context) {

                    // increment badge counts of tab
                    badgeCount += testcase.getProperty("accepted") === false;

                    // wrap testcase description in Dodona message (if string)
                    // TODO: this should be formatted as JavaScript
                    if (
                        testcase.hasProperty("description") && 
                        typeof testcase.getProperty("description") === "string"
                    ) {
                        
                        testcase.setProperty(
                            "description", 
                            new Message({
                                description: testcase.getProperty("description"),
                                format: "code"
                            })
                        );
                        
                    }        

                    // increment timings
                    try {
                        
                        const wall_time = testcase.getProperty("runtime_metrics").wall_time;
                        if (wall_time !== undefined) {
                            timings[0] += wall_time;
                            timings[1] += wall_time;
                            timings[2] += wall_time;
                            hasTimings[0] = true;
                            hasTimings[1] = true;
                            hasTimings[2] = true;
                        }
                        
                    } catch(e) {
                        // no runtime metrics available
                    }
                    
                    // remember which tests should be removed
                    let index = 0;
                    let removeTests = [];
                    
                    for (let test of testcase) {
                        
                        if (test.hasProperty("data")) {
                            
                            // check if test is processed
                            const isProcessed = test.getProperty("status") !== "unprocessed";

                            // remove evaluation sections from test
                            delete test.getProperty("data").evaluation;
                            
                            // add banner to test
                            if (test.getProperty("data").channel !== undefined) {
                                
                                if (isProcessed) {
                                    
                                    // add banner to processed test
                                    test.setProperties({
                                        description: bannerMessage(
                                            test.getProperty("data").channel, 
                                            test.getProperty("accepted") ? "success" : "danger"
                                        )
                                    });
                                    
                                } else {
                                    
                                    // add banner to unprocessed test
                                    test.setProperties({
                                        description: bannerMessage(
                                            test.getProperty("data").channel + " (unprocessed)", 
                                            "default"
                                        )
                                    });
                                    
                                }
                                
                            }
                            
                            if (test.getProperty("data").channel === "return") {
                                
                                // convert return value to string representation
                                if (!isProcessed) {
                                    
                                    const expected_result = test.getProperty("expected");
                                    test.setProperties({
                                        // unprocessed test cases are not accepted
                                        accepted: false,
                                        // unprocessed test cases inherit status from top-level
                                        // TODO: drop this if Dodona supports status "unprocessed"
                                        status: this.feedback.getProperty("status"),
                                        // convert return value to string representation
                                        expected: (
                                            multiline(expected_result) ? 
                                            expected_result : 
                                            utils.display(expected_result)
                                        )
                                    });
                                    
                                }
                                
                                // delete tests with both return values undefined
                                if (
                                    (
                                        !test.hasProperty("expected") ||
                                        test.getProperty("expected") === "undefined"
                                    )
                                    &&
                                    (
                                        !test.hasProperty("generated") ||
                                        test.getProperty("generated") === "undefined"
                                    )
                                ) {
                                    removeTests.push(index);
                                }
                                
                            }

                        }
                        
                        index += 1;

                    }
                    
                    // remove tests that have been marked as such
                    removeTests.sort((a, b) => b - a);
                    for (index of removeTests) {
                        delete testcase.tests.splice(index, 1);
                    }
                    
                    // remove tests property is not tests are left
                    if (testcase.tests.length === 0) {
                        testcase.deleteProperty("tests");
                    }
                    
                }
                
                // augment context
                // NOTE: should only be done if context has been processed
                if (hasTimings[2]) {
                    context.setProperties({
                        runtime_metrics: { wall_time: timings[2] },
                    });                
                }

            }

            // augment tab
            // NOTE: should only be done if context has been processed
            tab.setProperties({ badgeCount: badgeCount});
            if (hasTimings[1]) {
                tab.setProperties({
                    runtime_metrics: { wall_time: timings[1] },
                });
            }

        }
        
        // augment submission
        // NOTE: should only be done if feedback has been processed
        if (hasTimings[0]) {
            this.feedback.setProperties({
                runtime_metrics: { wall_time: timings[0] },
            });
        }

        // update feedback header with additional information
        // NOTE: only when all testcases have been processed
        if (!this.stoppedProcessing) {
            
            let information = [];
            
            // add runtime metrics
            if (this.feedback.hasProperty("runtime_metrics")) {
                
                let value;
                
                // fetch runtime metrics
                const metrics = this.feedback.getProperty("runtime_metrics");
                
                // add runtime metrics
                for (let metric in metrics) {
                    
                    // proper formatting of values 
                    if (metric === "wall_time") {
                        
                        // print timings with three decimal digits and suffix
                        // that indicates timings in seconds
                        value = metrics[metric].toFixed(3) + "s";
                        
                    } else {
                        
                        value = utils.display(metrics[metric]);
                        
                    }
                    
                    // key: replace underscores by spaces and capitalize
                    metric = metric
                        .replace("_", " ")
                        .replace(/^./, s => s.toUpperCase());
                    
                    // add message line
                    information.push("<b>" + metric + ":</b> " + value);
                    
                }
                
            }
            
            // add extra information to feedback header
            if (information) {
                
                this.feedback.addMessage(new Message({
                    description: information.join("<br>"),
                    format: "html"
                }));
                
            }
            
        }
        
        // return string representation of feedback
        return this.feedback.toString();

    }

}

// define helper function to determine if object is multiline string
function multiline(s) {
    return typeof s === "string" && s.includes("\n");
}

module.exports = {
    Judge: Judge
};