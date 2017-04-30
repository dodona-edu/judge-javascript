var OutputBuffer = function (stream, options) {
	
	// setup buffer that keeps track of output, so we can recover it later
	this.buffer = [];
	this.bufferOverFlow = false;
	this.bufferSize = 0;
	this.maxBufferSize = options.maxBufferSize || 1024 * 1024;

	// original stream whose output needs to be captured
	this.stream = stream;
	this.originalStreamWriter = stream.write;
	
	// start capturing output
	this.capture();
	
};

OutputBuffer.prototype.capture = function() {
	
	var self = this;
	
	// overwrite stream writer with function that captures the output 
	this.stream.write = function(string, encoding, fd) {
		
		// check if buffer can be extended
		if (self.bufferSize + string.length <= self.maxBufferSize) {

			// append string to buffer
			self.buffer.push(string);
			self.bufferSize += string.length;

		} else {
			// extend buffer if it has not overflown previously
			if (!self.bufferOverFlow) {
				self.buffer.push(
					(
						self.maxBufferSize - self.bufferSize < 3 ? '' :
						string.slice(0, self.maxBufferSize - self.bufferSize)
					) 
					+ "..."
				);
				self.bufferSize = self.maxBufferSize;
			}
			
			// indicate that a buffer overflow has occurred 
			self.bufferOverFlow = true;
			
			// throw an Error to indicate a buffer overrun
			throw new Error(
				"output buffer has exceeded maximal size (" + 
				self.maxBufferSize.toString() + 
				" bytes)"
			);
			
		}
			
	};
	
	// return current object for chaining
	return this;
	
};

OutputBuffer.prototype.release = function() {
	
	// restore the original stream writer
	this.stream.write = this.originalStreamWriter;
	
	// return current object for chaining
	return this;
	
};

OutputBuffer.prototype.getOutput = function() {
	
	// restore the original stream writer
	return this.buffer.join('');
	
};

module.exports = OutputBuffer;