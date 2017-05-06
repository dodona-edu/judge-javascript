// file system access
const fs = require("fs");

// sandboxing
const vm = require("vm");                       

// Dodona types
const {Message, Submission, Tab, Context, TestCase, Test} = require("./dodona.js"); 

//
// TestParser: parser for test cases
//

class TestParser {
    
    constructor() {
        
        // support for tab switches
        this.tabSwitched = false;         // context switch since last testcase

        // support for context switches
        this.autoSwitchContext = true;    // automatic context switching between testcases
        this.contextSwitched = false;     // context switch since last testcase
        
        // create new submission
        this.feedback = new Submission();
        
    }

    parse(testFile, options) {

        // options parameter is optional
        options = options || {};
        
        // setup separate scope in which tests will be parsed
        const scope = { judge: this };

        // setup sandbox for parsing of tests
        const sandbox = new vm.createContext(scope);
        
        // define options for evaluating submitted source code and tests
        const sandboxOptions = {
            filename: "<tests>",
            lineOffset: 0,
            columnOffset: 0,
            displayErrors: true,
            timeout: options.time_limit ? Math.max(1, options.time_limit): 1000
        };
        
        // parse tests
        vm.runInContext(
            fs.readFileSync(testFile, "utf8"), 
            sandbox, 
            sandboxOptions
        );

        // return feedback
        return this.feedback;
        
    }

    test(expression, expected, comparison) {
        
        // switch to new context if automatic context switching is on and no
        // context switch has happend since last testcase
        if (this.autoSwitchContext && !this.contextSwitched) {
            this.feedback.addContext(new Context());
        }
        
        // get ready for next tab and context switch
        this.tabSwitched = false;
        this.contextSwitched = false;
        
        // add expression as testcase
        this.feedback.addTestCase(new TestCase({description: expression}));
        
        // determine channel of expected result
        let channel = "return";
        if (
            typeof expected === "string" && 
            expected.slice(0, 10) === "exception:"
        ) {
            channel = "exception";
            // remove "expection:" prefix in case of expected exception
            expected = expected.slice(10);
        }
        
        // add expected result
        this.feedback.addTest(
            new Test({
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
        
    }

    config(name, value) {

        if (name === "switch-context") {
            
            // switch context if not already switched
            if (!this.contextSwitched) {
                this.feedback.addContext(new Context());
                this.contextSwitched = true;
            }
            
        } else if (name === "auto-switch-context") {
            
            // check if value is a Boolean
            if (typeof value !== "boolean") {
                throw new Error(
                    "parameter \"auto-switch-context\" must be a boolean"
                );
            }

            // switch context if not already switched
            this.autoSwitchContext = value;
            
        } else if (name === "switch-tab") {
            
            // check if value is a string
            if (typeof value !== "string") {
                throw new Error(
                    "parameter \"switch-tab\" must be a string"
                );
            }
            
            // switch context if not already switched
            if (!this.tabSwitched) {
                this.feedback.addTab(new Tab({
                    description: value
                }));
                this.tabSwitched = true;
            }
            
        }
        
    }

}

module.exports = TestParser;