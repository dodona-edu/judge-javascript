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
	
	var channels = {};

	// create output buffers to capture stdout and stderr of submitted code
	// NOTE: maximal buffer size is fixed to 10kb
	const OutputBuffer = require("./output-buffer");
	const stdoutBuffer = new OutputBuffer(process.stdout, {maxBufferSize: 10 * 1024});
	const stderrBuffer = new OutputBuffer(process.stderr, {maxBufferSize: 10 * 1024});

	// execute statements in sandbox
	try {
		if (typeof statements === "string") {
			// compile and run the statements
			channels["return"] = vm.runInContext(statements, this.sandbox, options);			
		} else {
			// run the pre-compiled statements
			channels["return"] = statements.runInContext(this.sandbox, options);
		}
	} catch(e) {
		channels["exception"] = e;
	}
	
	// capture stdout
	stdoutBuffer.release();
	channels["stdout"] = stdoutBuffer.getOutput();

	// capture stderr
	stdoutBuffer.release();
	channels["stderr"] = stderrBuffer.getOutput();
	
	return channels;

};

module.exports = Sandbox;