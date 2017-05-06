// sandboxing
const vm = require("vm");                       

//
// Sandbox
//

class Sandbox {
    
    constructor(options) {
        
        // options parameter is optional
        options = options || {};
        
        // setup separate scope in which submitted source code and tests will be
        // executed; here we can decide which objects from the current scope 
        // will be accessible for the submitted source code and the tests
        this.scope = {
            require: require,
            console: console,
        };

        // setup sandbox for execution of submitted source code and tests
        this.sandbox = new vm.createContext(this.scope);
        
        // capture options
        // NOTE: default maximal buffer size is 10kb
        this.maxBufferSize = options.maxBufferSize || 10 * 1024;

    }
    
    execute(code, options) {
        
        // initialize object that captures all output channels
        let channels = {};

        // create output buffers to capture stdout and stderr of submitted code
        const OutputBuffer = require("./output-buffer");
        const stdoutBuffer = new OutputBuffer(
            process.stdout, 
            {
                maxBufferSize: this.maxBufferSize
            }
        );
        const stderrBuffer = new OutputBuffer(
            process.stderr,
            {
                maxBufferSize: this.maxBufferSize
            }
        );

        // execute code in sandbox
        const start = new Date();
        try {
            
            // capture return value
            channels["return"] = (
                typeof code === "string" ?
                // compile and execute the code
                vm.runInContext(code, this.sandbox, options) : 
                // execute the pre-compiled code
                code.runInContext(this.sandbox, options)
            );

            // capture runtime metrics
            channels.runtime_metrics = {
                wall_time: (new Date() - start) / 1000
            };
            
        } catch(e) {
            
            // capture exception
            channels.exception = e;
            
        }
        
        
        // capture stdout
        stdoutBuffer.release();
        if (stdoutBuffer.output.length > 0) {
            channels.stdout = stdoutBuffer.output;
        }

        // capture stderr
        stderrBuffer.release();
        if (stderrBuffer.output.length > 0) {
            channels.stderr = stderrBuffer.output;
        }
        
        // capture global scope
        // NOTE: we might make a copy of the global scope in order to prevent
        //       changes to the scope from the outside
        channels.scope = this.scope
        
        // return object containing all captured output channels
        return channels;

    }

}

module.exports = Sandbox;