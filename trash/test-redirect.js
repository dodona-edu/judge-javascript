var OutputBuffer = require('../output-buffer');

var stdoutBuffer = new OutputBuffer(process.stdout, {maxBufferSize: 20});
var stderrBuffer = new OutputBuffer(process.stderr, {maxBufferSize: 20});

console.log('stdout: hello world');
console.error('stderr: hello world');

stdoutBuffer.release();
stderrBuffer.release();

console.log('buffered stdout: ' + stdoutBuffer.getOutput());
console.error('buffered stderr: ' + stderrBuffer.getOutput());