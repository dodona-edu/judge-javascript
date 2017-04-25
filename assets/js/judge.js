var fs = require('fs');
var utils = require('./utils.js');
var dodona = require('./dodona.js');
// var parallel = require('dimas-parallel');

var Judge = function(testfile) {
    
    // data structure that contains all test results
    this.submission = new dodona.Submission();
    
    // parse test file
    this.parseTests(testfile);
    
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
    
}

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
    
}

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
        for (test of testcase) {
            tests[test.getProperty('data')['channel']] = test;
        }
        var comparison = test.getProperty('data')['evaluation']['comparison'];
        if (comparison === undefined) {
            comparison = deepEqual;
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
    return;
        

    // private variables
    var test_cases = [];
    var test_index = 0;
    var evaluate = eval;
    var currentExpression;

    // use timer to avoid infinite loops or source code executing too slow
    var timeout = 10 * 1000; // default timeout after 10 seconds
    var timer;

    // return public interface of Judge
    return {
        // execute source code and tests
        run: run,

        // set new test case
        test: test,

        // set new timeout
        setTimeout: setCustomTimeout
    };

    // add test case to queue of test cases
    function test() {
        test_cases.push(Array.prototype.slice.call(arguments));
    }

    // set custom timeout
    function setCustomTimeout(ms) {
        console.log('Time Limit Exceeded')

    }

    // execute test cases in queued order
    function run() {
        var context = {'status': 'CA', 'testcases': []};
        // start timer that will be fired upon timeout
        // startTimer();
        try {
            // execute source code in the global scope
            evaluate(sourceCode);
        } catch (e) {
            console.log('runtime error');
            return;
        }
        context.status = 'CA'
        while (test_index < test_cases.length) {
            // execute the next available test case
            testcase = exec_test.apply(undefined, test_cases[test_index++]);
            if (testcase.status !== 'CA') {
                context.status = testcase.status;
            }
            context.testcases.push(testcase);
        }
        return context;
    }

    function exec_test(expression, expected, comparison) {
        // set the current expression
        currentExpression = expression;

        // prepare object that will be returned to main thread
        var testcase = {};

        //
        // check correctness of submitted solution for this test case
        //

        var correct, str_expected, generated, str_generated;

        // check if exception was expected and adjust expected if this is the
        // case
        var expected_exception = false;
        str_expected = display(expected);
        try {
            // check if expected exception is a string that starts with
            // "expection:" prefix
            expected_exception = (expected.slice(0, 10) === "exception:");

            // remove "expection:" prefix in case of expected exception
            if (expected_exception) {
                str_expected = expected.slice(10);
            }
        } catch (e) {}

        // evaluate expression and set generated result accordingly
        var generated_exception = false;
        try {
            generated = evaluate(expression);            
            str_generated = display(generated);
            if (comparison === undefined) {
                comparison = deepEqual;
            }

            // check whether generated result is as expected
            args = [expected, generated]
            args = args.concat([].slice.call(arguments, 3));
            correct = (!expected_exception &&
                comparison.apply(comparison, args)
            );
        } catch (e) {
            // remember that exception was generated
            generated_exception = true;

            // convert exception into string
            generated = e;
            str_generated = displayError(e);
            // check whether generated exception is as expected
            correct = (
                expected_exception &&
                deepEqual(str_expected, str_generated)
            );
        }
        // set evaluation status of feedback
        if (expected !== undefined || generated !== undefined) {
            if (generated_exception && !expected_exception) {
                testcase.status = "RE";
                testcase.message = str_generated;
            } else {
                testcase.generated = str_generated;
                testcase.expected = str_expected;
                if (!correct) { 
                    testcase.status = "WA"
                } else {
                    testcase.status = 'CA'
                }
            }
        }

        return testcase;
    };


}

module.exports = {
    Judge: Judge
};
