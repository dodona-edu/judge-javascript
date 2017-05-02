// sandboxing
const vm = require("vm");                       

const Sandbox = function() {
	
	// setup separate scope in which submitted source code and tests will be
	// executed; here we can decide which objects from the current scope will
	// be accessible for the submitted source code and the tests
	this.scope = {
		require: require,
		console: console,
	};

	// setup sandbox for execution of submitted source code and tests
	this.sandbox = new vm.createContext(this.scope);

}

Sandbox.prototype.execute = function(statements, options) {
	
	var start,
		output,
		channels = {};

	// create output buffers to capture stdout and stderr of submitted code
	// NOTE: maximal buffer size is fixed to 10kb
	const OutputBuffer = require("./output-buffer");
	const stdoutBuffer = new OutputBuffer(process.stdout, {maxBufferSize: 10 * 1024});
	const stderrBuffer = new OutputBuffer(process.stderr, {maxBufferSize: 10 * 1024});

	// execute statements in sandbox
	start = new Date();
	try {
		
		// capture return value
		if (typeof statements === "string") {
			// compile and run the statements
			channels["return"] = vm.runInContext(statements, this.sandbox, options);			
		} else {
			// run the pre-compiled statements
			channels["return"] = statements.runInContext(this.sandbox, options);
		}
		
		// capture runtime metrics
		channels["runtime_metrics"] = {
			wall_time: (new Date() - start) / 1000
		};
		
	} catch(e) {
		
		// capture exception
		channels["exception"] = e;
	}
	
	
	// capture stdout
	stdoutBuffer.release();
	output = stdoutBuffer.getOutput();
	if (output.length > 0) {
		channels["stdout"] = output;
	}

	// capture stderr
	stderrBuffer.release();
	output = stderrBuffer.getOutput();
	if (output.length > 0) {
		channels["stderr"] = output;
	}
	
	// capture global scope
	// NOTE: we might make a copy of the global scope in order to prevent
	//       changes to the scope from the outside
	channels["scope"] = this.scope
	
	return channels;

};

module.exports = Sandbox;