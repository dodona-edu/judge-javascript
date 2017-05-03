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
//
//

function labeledMessage(label, description, status, options) {
	
}

function bannerMessage(description, status="danger", options={}) {
	return new Message(
		Object.assign(
			options,
			{
				description: "<span class=\"label label-" + status + "\" style=\"display:block;text-align:left;\">" + description + "</span>",
				format: "html"
			}
		)
	);	
}

//
// Judge
//

const Judge = function(testFile, options) {
    
	// start timing
	this.time_start = new Date();
	
	// extract options
	this.time_limit = options ? options.time_limit || 10000 : 10000;
	
    // errors that stop further processing
    this.criticalErrors = [
        "memory limit exceeded",
        "time limit exceeded",
        "compilation error",
    ];

    // setup data structure to which all test results will be added
	const parser = new TestParser();
    this.feedback = parser.parse(
    	testFile,
    	{
    		time_limit: Math.max(this.timeRemaining(), 1)
    	}
    );
    
};

// compute time remaining for judge
Judge.prototype.timeRemaining = function() {
	
	// compute time left since start of judging
	return this.time_limit - (new Date() - this.time_start);
	
};

Judge.prototype.run = function(sourceFile) {
    
	// define options for evaluating submitted source code and tests
	var options = {
		filename: "<code>",
		lineOffset: 0,
		columnOffset: 0,
		displayErrors: true,
		timeout: Math.max(this.timeRemaining(), 1),
	};
	
	// read and compile submitted source code
    try {
    	
    	// read submitted source code from file
    	var code = fs.readFileSync(sourceFile, "utf8");

    	// pre-compile submitted source code
    	// NOTE: this could happen before all test cases are processed; after
    	//       all, if compiling the submitted source code fails, all test
    	//       cases are removed from the feedback; in the future we might
    	//       mark the testcases as not being evaluated
    	var script = new vm.Script(code, options);
        
    } catch (e) {
    	    	    	
    	// set feedback status to compilation error
    	this.feedback.update({
    		status: "compilation error"
    	});    		
    	
    	// add message with compilation error (student version)
    	this.feedback
    		.addMessage(
				bannerMessage(
					"compilation error", 
					"danger"
				)
			)
    		.addMessage(new Message({
	    		description: utils.displayError(e, true),
	        	format: "code"
	    	}));
    	
    	// add message with compilation error (staff version)
    	this.feedback
			.addMessage(
				bannerMessage(
					"compilation error (staff version)", 
					"danger", 
					{ permission: "staff"}
				)
			)
    		.addMessage(new Message({
	    		description: utils.displayError(e, false),
	    		permission: "staff",
	    		format: "code"
	    	}));
    	
    }
    
    // run submitted code in sandbox to see if it produces any runtime errors 
    // NOTE: this is done only when code was correctly compiled
	this.evaluateCode(script, options, this.feedback);
    
    // evaluate each context of each tab
    // NOTE: this is done only when code was correctly compiled and executed
    for (var tab of this.feedback) {
        for (var context of tab) {
        	options.timeout = Math.max(this.timeRemaining(), 1);
            this.evaluateContext(script, options, context);
        }
    }		
    
    // lint source code
    // TODO: enable linting as soon as ESLint has been added to JavaScript docker
    // this.lint(code);
    
    // output feedback (includes final cleanups)
    process.stdout.write(this.toString());
    
};

Judge.prototype.evaluateCode = function(code, options, testgroup, sandbox) {
	
	// check if testgroup needs processing
	var status = this.feedback.getProperty("status");
	if (
		// skip if submission has messages (corresponding to channels)
		this.feedback.hasMessages() ||
		// skip if critical errors occurred
		this.criticalErrors.indexOf(status) > -1
	) {
		
		// copy status of parent if parent observed a severe error
		testgroup.update({ status: status });
		
		// no further processing of testgroup
		return;
		
	}
	
	// create new temporary sandbox if none was provided
	if (!sandbox) {
		sandbox = new Sandbox();		
	}
	
	// update filename to source code
	options.filename = "<code>";
	// update timeout based on remaining time for judging
	options.timeout = Math.max(this.timeRemaining(), 1);
	// execute submitted code in sandbox
	const generated = sandbox.execute(code, options);
	
	// determine if code execution does not happen in silent mode
	let report = (
		!options || 
		!("silent" in options) || 
		options.silent === false
	);

	// update testgroup if exception was generated
	if ("exception" in generated) {
		
		// update status to runtime error
		// NOTE: may be more specific type of error (e.g. time limit exceeded)
		testgroup.update({
			status: utils.statusError(generated["exception"])
		});
		
		if (report) {
			
			// add message containing runtime error (student version)
			testgroup
    			.addMessage(
    				bannerMessage(
    					"exception", 
    					"danger"
    				)
    			)
				.addMessage(new Message({
					description: utils.displayError(generated["exception"], true),
			    	format: "code"
				}));
			
			// add message containing runtime error (staff version)
			testgroup
				.addMessage(
    				bannerMessage(
    					"exception", 
    					"danger",
    					{ permission: "staff" }
    				)
    			)
				.addMessage(new Message({
					description: utils.displayError(generated["exception"], false),
					permission: "staff",
					format: "code"
				}));

		}
		
	}
	
	// process spurious output on other channels
	// NOTE: return channel is not checked; after all, if the last statement is
	//       an assignment (e.g. a function assignment), the assigned expression
	//       is returned
	for (var channel of ["stdout", "stderr"]) {

		if (
			channel in generated &&
			// skip "empty" channels
			!(
				generated[channel] === undefined ||
				(channel !== "return" && generated[channel] === "")
			)
		) {
			
			// update status to runtime error
			testgroup.update({ status: "wrong answer" });
			
			if (report) {
				
				// add message containing wrong answer (student version)
				testgroup.addMessage(bannerMessage(channel, "danger"));
				testgroup.addMessage(
					new Message({
						description: (
							channel === "return" ? 
							utils.display(generated[channel]) : 
							generated[channel]
						),
				    	format: "code"
					})
				);
				
			}
			
		}
		
	}
	
};

Judge.prototype.evaluateContext = function(script, options, context) {
	
	// setup sandbox for execution of submitted source code and all test cases 
	// in the current context
	const sandbox = new Sandbox();

    // execute submitted source code in sandbox
	// NOTE: this should be safe due to the fact that we checked earlier if
	//       there was a runtime error and stopped processing if this were the
	//       case; as a result, we run it in silent mode
	var silent = options ? options.silent : undefined;
	options.silent = true;
	this.evaluateCode(script, options, context, sandbox);
	if (silent === undefined) {
		delete options.silent;
	} else {
		options.silent = silent;
	}

	// execute all test cases of context in the same sandbox
	for (var testcase of context) {
		this.evaluateTestcase(testcase, options, sandbox);
	}
	
};
    
Judge.prototype.evaluateTestcase = function(testcase, options, sandbox) {
	
	// check if testcase needs processing
	var status = this.feedback.getProperty("status");
	if (
		// skip if submission has messages (corresponding to channels)
		this.feedback.hasMessages() ||
		// skip if critical errors occurred
		this.criticalErrors.indexOf(status) > -1
	) {
		
		// update testcase
		testcase.update({ status: status });
		
		// update all tests of testcase
		for (var test of testcase) {
			
			// update status
			test.update({ status: status });
			
			// convert return value to string representation
			if (test.getProperty("data").channel === "return") {
				const expected_result = test.getProperty("expected");
				test.update({
	                expected: (
	                	multiline(expected_result) ? 
	                	expected_result : 
	                	utils.display(expected_result)
	                )
				});
			}
			
		}
		
		// no further processing of testgroup
		return;
		
	}
	
    // import module for checking equality of JavaScript objects
    const deepEqual = require("deep-equal");
    
	// map channels to corresponding tests
    var expected = {};
    for (var test of testcase) {
    	expected[test.getProperty("data").channel] = test;
    }
	
	// extract information from testcase
    var statements = testcase.getProperty("description");
    var comparison = test.getProperty("data").evaluation.comparison || deepEqual;
    var comparisonArguments = test.getProperty("data").evaluation.arguments;
    
	// update filename to source code
	options.filename = "<test>";
	// update timeout based on remaining time for judging
	options.timeout = Math.max(this.timeRemaining(), 1);
	// execute submitted code in sandbox
	const generated = sandbox.execute(statements, options);

	// evaluate testcase statements
    var expected_result,
        generated_result,
        args,
        correct;
    
    // process return and exception channels
    if ("return" in generated) {
        
    	// fetch expected return value
        generated_result = generated["return"];

        if ("return" in expected) {
            
            // compare expected and generated return values
            expected_result = expected["return"].getProperty("expected");
            args = [expected_result, generated_result]
            	.concat(comparisonArguments);
            correct = comparison.apply(comparison, args);
            
            // update test of return values
            expected["return"].update({
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
            
            // report on spurious or missing newlines in multiline case
            if (multiline(expected_result) && multiline(generated_result)) {
            	if (
            		expected_result.endsWith("\n") &&
            		expected_result.slice(0, -1) === generated_result
            	) {
            		expected["return"].addMessage(new Message({
            			description: "Error: returned string misses trailing newline",
            			format: "code"
            		}));
            	} else if (
            		generated_result.endsWith("\n") &&
            		generated_result.slice(0, -1) === expected_result
            	) {
            		expected["return"].addMessage(new Message({
            			description: "Error: returned string has spurious trailing newline",
            			format: "code"
            		}));
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
            
            // update test of expected exception
            expected.exception.update({
                status: "wrong answer"
            });            
            
        }
        
    } else {
        
    	// fetch generated exception
    	generated_result = utils.displayError(generated["exception"], true);

        // check whether exception is as expected
        if ("exception" in expected) {
        
        	// fetch expected exception
        	expected_result = expected.exception.getProperty("expected");

        	// compare expected and generated exceptions
        	// NOTE: expected exception is compared only to the first line of
        	//       the generated exception
            args = [expected_result, utils.lineError(generated_result)]
            	.concat(comparisonArguments);
            correct = comparison.apply(comparison, args);
            
            // update test of exceptions
            // NOTE: the entire cleaned up stack trace is shown to help the 
            //       user find where the exception was raised
            expected.exception.update({
                status: (
                	correct ? 
                	"correct answer" : 
                	utils.statusError(generated["exception"])
                ),
                generated: generated_result
            });
            
        } else {
        	
        	// fetch expected return value
            expected_result = expected["return"].getProperty("expected");
            
            // add test for generated exception
            testcase.addTest(new Test({
                status: utils.statusError(generated["exception"]),
                generated: generated_result,
                data: { channel: "exception" }
            }));
            
            /*
        	// add message with runtime error (staff version)
            testcase.addMessage(new Message({
        		description: utils.displayError(e, false),
        		permission: "staff",
        		format: "code"
        	}));
        	*/
        	
            // update test of expected return value
            expected["return"].update({
                status: "wrong answer",
                expected: (
                	multiline(expected_result) ? 
                	expected_result : 
                	utils.display(expected_result)
                )
            });
            
        }
        
    }

    // process expected and generated output channels
    for (var channel of ["stdout", "stderr"]) {
    	
    	expected_result = (
    		channel in expected ? 
    		expected[channel].getProperty("expected") : 
    		""
    	);
    	generated_result = channel in generated ? generated[channel] : "";
    	
        if (channel in expected || generated_result !== "") {
        	
        	// create new test for output channel if no output was expected
        	if (!(channel in expected)) {
        		expected[channel] = new Test({data: { channel: channel }});
        		testcase.addTest(expected[channel]);
        	}
        	
        	// add generated output on the channel
        	if (generated_result !== "") {
        		expected[channel].update({
        			expected: expected_result,
        			generated: generated_result,
        		});
        	}
        	
        	// compare expected and generated output channels
            args = [expected_result, generated_result]
            	.concat(comparisonArguments);
            correct = comparison.apply(comparison, args);
        	expected[channel].update({
                status: correct ? "correct answer" : "wrong answer"
            });
        	
            // report on spurious or missing newlines in multiline case
        	if (
        		expected_result.endsWith("\n") &&
        		expected_result.slice(0, -1) === generated_result
        	) {
        		expected[channel].addMessage(new Message({
        			description: "Error: " + channel + " misses trailing newline",
        			format: "code"
        		}));
        	} else if (
        		generated_result.endsWith("\n") &&
        		generated_result.slice(0, -1) === expected_result
        	) {
        		expected[channel].addMessage(new Message({
        			description: "Error: " + channel + " has spurious trailing newline",
        			format: "code"
        		}));
        	}
            
        }
        
    }
    
    // add runtime metrics to testcase
    if ("runtime_metrics" in generated) {
    	testcase.update({ runtime_metrics: generated.runtime_metrics });
    }

};

Judge.prototype.lint = function(code) {
	
	// import ESLint API
	var linter = require("eslint").linter;
	
	// read ESLINT configuration file
	var config = JSON.parse(fs.readFileSync("config.eslint.json", "utf8"));
	
	// lint source code
	var messages = linter.verify(
		code, 
		config,
		{
			allowInlineConfig: false
		}
	);
	
	// add linter messages as feedback (if any)
	if (messages.length > 0) {
		
		// add new code tab
		this.feedback.addTab(new Tab({
			description: "code",
			data: {
				// NOTE: for now, the messages as generated by ESLint are passed
				//       on to the JSON output as is
				annotations: messages.map(function(message){
					return {
						message
					};
				})
			}
		}));
		
	}
	
};

Judge.prototype.toString = function() {
	
	var badgeCount;
	var timings = [0.0, 0.0, 0.0];
	var hasTimings = [false, false, false];
	
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
            		let wall_time = testcase.getProperty("runtime_metrics").wall_time;
                	if (wall_time !== undefined) {
                		timings[0] += wall_time;
                		timings[1] += wall_time;
                		timings[2] += wall_time;
                		hasTimings[0] = true;
                		hasTimings[1] = true;
                		hasTimings[2] = true;
                	}            		
            	} catch(e) {
            		// no timings available
            	}
            	
            	// remember which tests show be removed
            	let removeTests = [];
            	let index = 0;
            	
            	for (let test of testcase) {
            		
            		if (test.hasProperty("data")) {

                    	// remove evaluation sections from tests            		
            			delete test.getProperty("data").evaluation;
            			
                    	// add description to test
            			if (test.getProperty("data").channel !== undefined) {
            				let label = test.getProperty("accepted") ? "label-success" : "label-danger";
                			test.update({
                				description: new Message({
                					description: "<span class=\"label " + label + "\" style=\"display: block;text-align:left;\">" + test.getProperty("data").channel + "</span>",
                					format: "html"
                				})
                			});            				
            			}
            			
            			// delete tests with both return values undefined
            			if (
            				test.getProperty("data").channel === "return"
            				&&
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
            		
            		index += 1;

            	}
            	
            	// remove tests that have been marked as such
            	removeTests.sort(function(a, b) { return b - a; });
            	for (index of removeTests) {
            		delete testcase.getTests().splice(index, 1);
            	}
            	
            }
            
            // augment context
            // NOTE: should only be done if context has been processed
            if (hasTimings[2]) {
                context.update({
                	runtime_metrics: { wall_time: timings[2] },
                });            	
            }

        }

        // augment tab
        // NOTE: should only be done if context has been processed
        tab.update({ badgeCount: badgeCount});
        if (hasTimings[1]) {
	        tab.update({
	        	runtime_metrics: { wall_time: timings[1] },
	        });
        }

    }
    
    // augment submission
    // NOTE: should only be done if feedback has been processed
    if (hasTimings[0]) {
	    this.feedback.update({
	    	runtime_metrics: { wall_time: timings[0] },
	    });
    }

    // update feedback header with additional information
	if (
		// no additional information if header already contains other messages
		!this.feedback.hasMessages() && 
		// no additional information if critical errors were observed
		this.criticalErrors.indexOf(this.feedback.getProperty("status")) === -1
	) {
		
		let message = "";
		
		// add runtime metrics
		if (this.feedback.hasProperty("runtime_metrics")) {
			
			// fetch runtime metrics
			let metrics = this.feedback.getProperty("runtime_metrics");
			
			// add runtime metrics
			for (let metric in metrics) {
				
				// value: proper formatting 
				let value;
				if (metric === "wall_time") {
					value = metrics[metric].toFixed(3) + "s";
				} else {
					value = utils.display(metrics[metric]);
				}
				
				// key: replace underscores by spaces and capitalize
				metric = metric
					.replace("_", " ")
					.replace(/^./, function(s) {return s.toUpperCase(); });
				
				// add message line
				message += "<b>" + metric + ":</b> " + value + "<br>";
				
			}
		}
		
		// add extra information to feedback header
		if (message) {
			this.feedback.addMessage(new Message({
				description: message,
				format: "html"
			}));
		}
		
	}
    
    // return string representation of feedback
    return this.feedback.toString();

};

// define helper function to determine if object is multiline string
function multiline(s) {
	return typeof s === "string" && s.indexOf("\n") > -1;
}

module.exports = {
    Judge: Judge
};