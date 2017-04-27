const fs = require('fs');
const utils = require('./utils.js');
const dodona = require('./dodona.js');

//
// JudgeTimeoutError
//

var JudgeError = function(message) {
	this.name = 'JudgeError',
	this.message = message || 'internal judge error'
}

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
                        comparison: comparison
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
    		description: utils.displayError(e).split('\n')[0],
    		permission: 'student'
    	}));
    	
    	// add message with compilation error (staff version)
    	this.submission.addMessage(new dodona.Message({
    		description: utils.displayError(e),
    		permission: 'staff'
    	}));
    	
    	// clear all tabs
    	this.submission.clearGroups();
    	this.submission.clearTests();

    	// stop further processing
    	criticalError = true;
        
    }
    
    // evaluate each context
    if (!criticalError) {
        for (var tab of this.submission) {
            for (var context of tab) {
                this.evaluate(code, context);
            }
        }    	
    }
    
    // return feedback as JSON string
    return this.submission.toString();
    
};

Judge.prototype.evaluate = function(code, context) {
    
    // execute source code in the global scope
    // TODO: this should be executed in a separate scope
    eval(code);
    
    // check equality of JavaScript objects
    var deepEqual = require('deep-equal');

    for (var testcase of context) {
        
        // extract information from testcase
        var expression = testcase.getProperty('description');
        var tests = {};
        for (var test of testcase) {
            tests[test.getProperty('data')['channel']] = test;
        }
        var comparison = test.getProperty('data')['evaluation']['comparison'];
        if (comparison === undefined) {
            comparison = deepEqual;
        }
        
    	// wrap testcase description into message (if string)
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
        
        try {
            
            // evaluate expression
            generated = eval(expression);
            
            // check whether generated result is as expected
            if ('exception' in tests) {
                
                // unexpected return value
                testcase.addTest(new dodona.Test({
                    generated: utils.display(generated),
                    data: { channel: 'return' }
                }));
                
                tests['exception'].update({
                    status: 'wrong answer'
                });
                
                
            } else {
                
                // compare expected and generated return values
                expected = tests['return'].getProperty('expected');
                args = [expected, generated]
                args = args.concat([].slice.call(arguments, 3));
                correct = comparison.apply(comparison, args);
                
                // update return channel
                tests['return'].update({
                    status: correct ? 'correct answer' : 'wrong answer',
                    expected: utils.display(expected),
                    generated: utils.display(generated)
                });
                
            }
            
        } catch (e) {
            
            generated = utils.displayError(e).split('\n')[0];

            // check whether exception is as expected
            if ('exception' in tests) {
            
                // compare expected and generated exceptions
                expected = tests['exception'].getProperty('expected');
                correct = deepEqual(expected, generated);
                
                // update exception channel
                tests['exception'].update({
                    status: correct ? 'correct answer' : 'wrong answer',
                    generated: generated
                });
                
            } else {
                
                // unexpected exception
                testcase.addTest(new dodona.Test({
                    generated: generated,
                    data: { channel: 'exception' }
                }));
                
                tests['return'].update({
                    status: 'runtime error',
                    expected: utils.display(tests['return'].getProperty('expected'))
                });
                
            }
            
        }
        
    }

};

module.exports = {
    Judge: Judge
};
