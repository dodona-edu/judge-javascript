const fs = require('fs');
const utils = require('./utils.js');
const dodona = require('./dodona.js');

//
// JudgeTimeoutError
//

var JudgeTimeoutError = function() {
	this.name = 'JudgeTimeoutError',
	this.message = 'time limit exceeded'
}

JudgeTimeoutError.prototype = Object.create(Error.prototype);
JudgeTimeoutError.prototype.constructor = JudgeTimeoutError;

//
// Judge
//

var Judge = function(testfile, timeout) {
    
    // data structure that contains all test results
    this.submission = new dodona.Submission();

    // parse test file
    this.parseTests(testfile);
    
    // use timer to avoid infinite loops or source code executing too slow
    this.timeout = timeout;
    this.timer = null;

};

Judge.prototype.clearTimer = function(ms) {

    // clear previous timer
	if (this.timer !== null) {
	    clearTimeout(this.timer);
	    this.timer = null;
	}

};

Judge.prototype.setTimer = function(ms) {
	
	// default timeout after 10 seconds
    ms = (ms === undefined ? 1 * 1000 : ms); 

    // clear previous timer
    this.clearTimer();

    // set new timeout to abort code execution after ms milliseconds
    this.timer = setTimeout(
    	function () { throw new JudgeTimeoutError(); }, 
    	ms
    );

};

// parse test cases
Judge.prototype.parseTests = function(testfile) {
    
    var self = this;
    
    // create parser for test cases
    var TestParser = function() {};
    TestParser.prototype.test = function(expression, expected, comparison) {
        
        // for now, each testcase is in its own context
        self.submission.addContext(new dodona.Context());
        
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
    
    // create judge object used in description of test cases
    var judge = new TestParser();
    
    // evaluate all tests
    var tests = fs.readFileSync(testfile).toString().split('\n');
    for (var statement of tests) {
        eval(statement);
    }
    
};

Judge.prototype.run = function(sourcefile) {
    
	// set timer to end processing early on
    this.setTimer(this.timeout);
    
    // while (true) {};

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
    
	// clear the timer
    this.clearTimer();

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
                    status: 'runtime error'
                });
                
            }
            
        }
        
    }

};

module.exports = {
    Judge: Judge
};
