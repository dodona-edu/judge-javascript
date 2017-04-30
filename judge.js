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
    	this.feedback.addMessage(new Message({
    		description: utils.displayError(e, true),
    		permission: "student",
        	format: "code"
    	}));
    	
    	// add message with compilation error (staff version)
    	this.feedback.addMessage(new Message({
    		description: utils.displayError(e, false),
    		permission: "staff",
    		format: "code"
    	}));
    	
    }
    
    // run submitted code in sandbox to see if it produces any runtime errors 
    // NOTE: this is done only when code was correctly compiled
	this.evaluateCode(script, options, this.feedback);
    
	if (this.feedback.getProperty("accepted")) {
	    // evaluate each context of each tab
	    for (var tab of this.feedback) {
	        for (var context of tab) {
	        	options.timeout = Math.max(this.timeRemaining(), 1);
	            this.evaluateContext(script, options, context);
	        }
	    }		
	} else {
		// mark all tests as unprocessed
		var status = this.feedback.getProperty("status");
	    for (var tab of this.feedback) {
	        for (var context of tab) {
	        	for (var testcase of context) {
	        		for (var test of testcase) {
	        			
	        			// update status
	        			test.update({ status: status });
	        				        			
	        		}
	        	}
	        }
	    }		
	}
    
    // lint source code
    // TODO: enable linting as soon as ESLint has been added to JavaScript docker
    // this.lint(code);
    
    // output feedback (includes final cleanups)
    process.stdout.write(this.toString());
    
};

Judge.prototype.evaluateCode = function(code, options, testgroup, sandbox) {
	
	// testgroup remains unprocessed if severe error occurred
	var status = this.feedback.getProperty("status");
	if (this.criticalErrors.indexOf(status) > -1) {
		
		// copy status of parent if parent observed a severe error
		testgroup.update({ status: status });
		
		// no further processing of testgroup
		return;
		
	}
	
	// create new temporary sandbox if none was provided
	if (!sandbox) {
		sandbox = new Sandbox();		
	}
	
	// execute submitted code in sandbox
	// NOTE: update timeout based on remaining time for judging
	options.timeout = Math.max(this.timeRemaining(), 1);
	const generated = sandbox.execute(code, options);

	// update testgroup if exception was generated
	if ("exception" in generated) {
		
		// update status to runtime error
		testgroup.update({
			status: utils.statusError(generated["exception"])
		});
		
		if (!options || !("silent" in options) || options.silent === false) {
			
			// add message containing runtime error (student version)
			testgroup.addMessage(new Message({
				description: utils.displayError(generated["exception"], true),
				permission: 'student',
		    	format: 'code'
			}));
			
			// add message containing runtime error (staff version)
			testgroup.addMessage(new Message({
				description: utils.displayError(generated["exception"], false),
				permission: 'staff',
				format: 'code'
			}));

		}
		
	}
	
	// TODO: consider what should be done if other channels are available
	//       (return value, stdout, stderr)
	
	// return generated channels
	return generated;
	
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

	// execute all test cases of the context in the same sandbox
	for (var testcase of context) {
		this.evaluateTestcase(testcase, options, sandbox);
	}
	
};
    
Judge.prototype.evaluateTestcase = function(testcase, options, sandbox) {
	
	// testgroup remains unprocessed if severe error occurred
	var status = this.feedback.getProperty("status");
	if (this.criticalErrors.indexOf(status) > -1) {
		
		// update testcase
		testcase.update({ status: status });
		
		// update all tests of testcase
		for (var test of testcase) {
			
			// update status
			test.update({ status: status });
			
			// convert return value to string
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
    
	// execute testcase statements in sandbox
	// NOTE: update timeout based on remaining time for judging
	options.timeout = Math.max(this.timeRemaining(), 1);
	const generated = sandbox.execute(statements, options);

	// evaluate testcase statements
    var expected_result,
        generated_result,
        args,
        correct;
    
    if ("return" in generated) {
        
    	// fetch expected return value
        generated_result = generated["return"];

        if ("return" in expected) {
            
            // compare expected and generated return values
            expected_result = expected["return"].getProperty("expected");
            args = [expected_result, generated_result].concat(comparisonArguments);
            correct = comparison.apply(comparison, args);
            
            // update test of return values
            expected["return"].update({
                status: correct ? 'correct answer' : 'wrong answer',
                expected: multiline(expected_result) ? expected_result : utils.display(expected_result),
                generated: multiline(generated_result) ? generated_result : utils.display(generated_result)
            });
            
            // hide expected and generated return values if both are undefined 
            // (fixes #18)
            // TODO: we might remove the test altogether
            if (expected_result === undefined && generated_result === undefined) {
            	expected["return"]
            		.deleteProperty("expected")
            		.deleteProperty("generated");
            }
            
        } else {
            
            // add test for generated return value
            testcase.addTest(new Test({
                status: "wrong answer",
                generated: multiline(generated_result) ? generated_result : utils.display(generated_result),
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
            correct = deepEqual(expected_result, utils.lineError(generated_result));
            
            // update test of exceptions
            // NOTE: the entire cleaned up stack trace is shown to help the 
            //       user find where the exception was raised
            expected.exception.update({
                status: correct ? "correct answer" : utils.statusError(generated["exception"]),
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
                expected: multiline(expected_result) ? expected_result : utils.display(expected_result)
            });
            
        }
        
    }

    // compare expected and generated output channels
    for (var channel in ["stdout", "stderr"]) {
    	
        if (channel in generated || channel in expected) {
        	
        	// create new test for output channel if no output was expected
        	if (!(channel in expected)) {
        		expected[channel] = new Test({data: { channel: channel }});
        		testcase.addTest(expected[channel]);
        	}
        	
        	// add generated output on the channel
        	if (channel in generated) {
        		expected[channel].update({
        			generated: generated[channel]
        		});
        	}
        	
        	// compare expected and generated output channels
            args = [expected[channel].expected, expected[channel].generated].concat(comparisonArguments);
            correct = comparison.apply(comparison, args);
        	expected[channel].update({
                status: correct ? "correct answer" : "wrong answer"
            });
        	
        }
        
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
    for (var tab of this.feedback) {

    	// initialize badge count of tab
    	badgeCount = 0;
    	
        for (var context of tab) {
        	
            for (var testcase of context) {

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

            	// increment badge counts of tab
            	badgeCount += testcase.getProperty('accepted') === false;

            	for (var test of testcase) {
            		
                	// remove evaluation sections from tests            		
            		if (test.hasProperty("data")) {
            			delete test.getProperty("data")["evaluation"];
            		}
            		
            	}
            	
            }
        }
        tab.setProperty('badgeCount', badgeCount);
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