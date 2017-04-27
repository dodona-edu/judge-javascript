const fs = require('fs');
const utils = require('./utils.js');
const dodona = require('./dodona.js');

//
// JudgeTimeoutError
//

var JudgeError = function(message) {
	this.name = 'JudgeError';
	this.message = message || 'internal judge error';
};

JudgeError.prototype = Object.create(Error.prototype);
JudgeError.prototype.constructor = JudgeError;

//
// Judge
//

var Judge = function(testfile, timeout) {
    
    // data structure that contains all test results
    this.submission = new dodona.Submission();

    // parse test file
    this.parseTests(testfile);
    
};

// parse test cases
Judge.prototype.parseTests = function(testfile) {
    
    var self = this;
    
    // create parser for test cases
    var TestParser = function() {
    	
    	// support for tab switches
    	this.tabSwitched = false;         // context switch since last testcase

    	// support for context switches
    	this.autoSwitchContext = true;    // automatic context switching between testcases
    	this.contextSwitched = false;     // context switch since last testcase
    	
    };
    
    TestParser.prototype.test = function(expression, expected, comparison) {
        
        // switch to a new context if automatic context switching is on and no
    	// context switch has happend since last testcase
    	if (this.autoSwitchContext && !this.contextSwitched) {
            self.submission.addContext(new dodona.Context());
    	}
    	// get ready for next tab and context switch
        this.tabSwitched = false;
        this.contextSwitched = false;
        
        // add expression as testcase
        self.submission.addTestCase(
            new dodona.TestCase({
                description: expression
            })
        );
        
        // determine channel of expected result
        var channel = 'return';
        if (typeof expected === 'string' && expected.slice(0, 10) === 'exception:') {
            channel = 'exception';
            // remove "expection:" prefix in case of expected exception
            expected = expected.slice(10);
        }
        
        // add expected result
        self.submission.addTest(
            new dodona.Test({
                expected: expected,
                data: { 
                    channel: channel,
                    evaluation: {
                        comparison: comparison,
                        // capture additional arguments passed on to the test
                        // method (following the expression to evaluate, the
                        // expected result and the comparison function to be
                        // used; these additional argument will be provided to
                        // the comparison function, following the expected and
                        // generated result
                        arguments: [].slice.call(arguments, 3)
                    }
                }
            })
        );
        
    };
    
    TestParser.prototype.config = function(name, value) {

    	if (name === 'switch-context') {
        	// switch context if not already switched
    		if (!this.contextSwitched) {
    			self.submission.addContext(new dodona.Context());
    			this.contextSwitched = true;
    		}
    	} else if (name === 'auto-switch-context') {
        	// switch context if not already switched
			if (typeof value !== 'boolean') {
				throw new JudgeError('parameter "auto-switch-context" must be a boolean');
			}
			this.autoSwitchContext = value;
		} else if (name === 'switch-tab') {
	    	// switch context if not already switched
			if (typeof value !== 'string') {
				throw new JudgeError('parameter "switch-tab" must be a string');
			}
    		if (!this.tabSwitched) {
				self.submission.addTab(new dodona.Tab({description: value}));
				this.tabSwitched = true;
    		}
		}
    	
    };
    
    // create judge object used in description of test cases
    var judge = new TestParser();
    
    // evaluate all tests
    eval(fs.readFileSync(testfile).toString());
    
};

Judge.prototype.run = function(sourcefile) {
    
    // read source file
    var code = fs.readFileSync(sourcefile).toString(),
        criticalError = false;
    
    // evaluate source code
	// avoid that console.log can output results to stdout
	// TODO: replace this by properly capturing stdout and stderr
	var stdout = console.log;
	console.log = function() {};
    
    try {
    	
        // execute source code in the global scope
        // TODO: this should be executed in a separate scope
        eval(code);
        
    } catch (e) {
    	    	    	
    	// set status to compilation error
    	this.submission.update({
    		status: 'compilation error'
    	});
    	
    	// add message with compilation error (student version)
    	this.submission.addMessage(new dodona.Message({
    		description: utils.displayError(e, true),
    		permission: 'student',
        	format: 'code'
    	}));
    	
    	// add message with compilation error (staff version)
    	this.submission.addMessage(new dodona.Message({
    		description: utils.displayError(e, false),
    		permission: 'staff',
    		format: 'code'
    	}));
    	
    	// clear all tabs
    	this.submission.clearGroups();
    	this.submission.clearTests();

    	// stop further processing
    	criticalError = true;
        
    }
    
    // restore stdout
    console.log = stdout;

    // evaluate each context
    if (!criticalError) {
        for (var tab of this.submission) {
            for (var context of tab) {
                this.evaluate(code, context);
            }
        }    	
    }
    
    // output submission (includes final cleanups)
    return this.toString();
    
};

Judge.prototype.evaluate = function(code, context) {
	
	// avoid that console.log can output results to stdout
	// TODO: replace this by properly capturing stdout and stderr
	var stdout = console.log;
	console.log = function() {};
    
    // execute source code in the global scope
	// NOTE: this should be safe now
    // TODO: this should be executed in a separate scope
    eval(code);
    console.log = stdout;
    
    // check equality of JavaScript objects
    var deepEqual = require('deep-equal');

    for (var testcase of context) {
        
    	// map channels to their corresponding tests
        var tests = {};
        for (var test of testcase) {
            tests[test.getProperty('data').channel] = test;
        }
    	
    	// extract information from testcase
        var expression = testcase.getProperty('description');
        var comparison = test.getProperty('data').evaluation.comparison || deepEqual;
        var comparisonArguments = test.getProperty('data').evaluation.arguments;
        
    	// wrap testcase description in javascript message (if string)
    	if (
    		testcase.hasProperty('description') && 
    		typeof testcase.getProperty('description') === 'string'
    	) {
    		testcase.setProperty(
    			'description', 
    			new dodona.Message({
	    			description: testcase.getProperty('description'),
	    			format: 'code'
	    		})
	    	);
    	}        

        // evaluate expression
        var generated, 
            expected,
            args,
            correct;
        
    	// avoid that console.log can output results to stdout
    	// TODO: replace this by properly capturing stdout and stderr
    	var stdout = console.log;
    	console.log = function() {};
        
        try {
            
            // evaluate expression
            generated = eval(expression);
            
            // check whether generated result is as expected
            if ('exception' in tests) {
                
                // unexpected return value
                testcase.addTest(new dodona.Test({
                    status: 'wrong answer',
                    generated: utils.display(generated),
                    data: { channel: 'return' }
                }));
                
                tests.exception.update({
                    status: 'wrong answer'
                });
                
                
            } else {
                
                // compare expected and generated return values
                expected = tests['return'].getProperty('expected');
                args = [expected, generated].concat(comparisonArguments);
                correct = comparison.apply(comparison, args);
                
                // update return channel
                tests['return'].update({
                    status: correct ? 'correct answer' : 'wrong answer',
                    expected: utils.display(expected),
                    generated: utils.display(generated)
                });
                
                // hide expected and generated return values if both are equal
                // to undefined (fixes #18)
                if (expected === undefined && generated === undefined) {
                	tests['return']
	            		.deleteProperty('expected')
	            		.deleteProperty('generated');
                }
                
            }
            
        } catch (e) {
            
            generated = utils.displayError(e, true);

            // check whether exception is as expected
            if ('exception' in tests) {
            
                // compare expected and generated exceptions
                expected = tests.exception.getProperty('expected');
                correct = deepEqual(expected, generated);
                
                // update exception channel
                tests.exception.update({
                    status: correct ? 'correct answer' : 'wrong answer',
                    generated: generated
                });
                
            } else {
                
                // unexpected exception
                testcase.addTest(new dodona.Test({
                    status: 'wrong answer',
                    generated: generated,
                    data: { channel: 'exception' }
                }));
                
            	// add message with runtime error (staff version)
                // TODO: a cleaned up version of this stack trace should be
                //       shown to the students (so they can see the lines in
                //       their code that generated the error)
                testcase.addMessage(new dodona.Message({
            		description: '<span class="code"><pre>' + utils.displayError(e, false).replace('\n', '<br />') + '</pre></span>',
            		permission: 'staff',
            		format: 'html'
            	}));
            	
                tests['return'].update({
                    status: 'runtime error',
                    expected: utils.display(
                    	tests['return'].getProperty('expected')
                    )
                });
                
            }
            
        }

        // restore stdout
        console.log = stdout;
        
    }

};

Judge.prototype.toString = function() {
	
	// add badge counts to tabs
	var badgeCount;
    for (var tab of this.submission) {
    	badgeCount = 0;
        for (var context of tab) {
            for (var testcase of context) {
            	badgeCount += testcase.getProperty('accepted') === false;
            }
        }
        tab.setProperty('badgeCount', badgeCount);
    }
    
    // return string representation of submission
    return this.submission.toString();

};

module.exports = {
    Judge: Judge
};