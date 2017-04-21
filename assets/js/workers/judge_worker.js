module.exports = {

    Judge: function(sourceCode) {
        var deepEqual = require('deep-equal')

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
    

        function display(obj) {
            var str = '',
                keys = [],
                key, i;

            if (obj === undefined) {
                return 'undefined';
            } else if (obj === null) {
                return 'null';
            } else if (Array.isArray(obj)) {
                for (i = 0; i < obj.length; ++i) {
                    if (str) {
                        str += ', ';
                    }
                    str += display(obj[i]);
                }
                return '[' + str + ']';
            } else if (typeof obj === 'object') {
                // pretty print object
                if (obj.hasOwnProperty !== undefined &&
                    typeof obj.hasOwnProperty === 'function') {
                    for (key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            keys.push(key);
                        }
                    }
                } else {
                    for (key in obj) {
                        keys.push(key);
                    }
                }
                keys.sort();
                for (i = 0; i < keys.length; ++i) {
                    if (str) {
                        str += ', ';
                    }
                    str += display(keys[i]) + ': ' + display(obj[keys[i]]);
                }
                return '{' + str + '}';
            } else {
                if (typeof obj === 'string') {
                    // return "'" + obj + "'";
                    var repr = JSON.stringify(obj);
                    if (
                        repr.indexOf("'") === -1 &&
                        repr.slice(1, -1).indexOf('\\"') >= 0
                    ) {
                        repr = "'{repr}'".format({
                            repr: repr.slice(1, -1).replace('\\"', '"', "g")
                        });
                    }
                    return repr;
                } else {
                    // pretty print general object
                    return obj.toString();
                }
            }
        }

        // helper function for converting Error objects to string
        function displayError(e, showLine) {
            try {
                if (typeof e === "string") {
                    return e;
                } else {
                    // format message
                    if (e.name !== undefined && e.message !== undefined) {
                        // add line number if available
                        if (
                            // check if line number is available
                            e.lineNumber &&
                            // check if stack trace is available
                            e.stack &&
                            // check if stack trace goes deeper than error in statement
                            // that is being executed (in other words: in the submitted
                            // source code)
                            e.stack.split("\n").length != 5
                        ) {
                            message = e.name + " (line " + e.lineNumber + "): " + e.message;
                        } else {
                            message = e.name + ": " + e.message;
                        }
                    } else {
                        message = "JudgeError: ill-formed Error";
                        if (display(e) !== "") {
                            message += ": " + display(e)
                        }
                    }
                    return message;
                }
            } catch (e) {
                return e.toString();
            }
        }
    }
}
