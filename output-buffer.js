class OutputBuffer {
    
    constructor(stream, options) {
        
        // options parameter is optional
        options = options || {};
        
        // setup buffer to capture output, so we can recover it later
        // NOTE: default maximal buffer size is 10kb
        this.buffer = [];
        this.bufferOverFlow = false;
        this.bufferSize = 0;
        this.maxBufferSize = options.maxBufferSize || 10 * 1024;

        // original stream whose output needs to be captured
        this.stream = stream;
        this.originalStreamWriter = stream.write;
        
        // start capturing output
        this.capture();
        
    }

    capture() {
        
        // overwrite stream writer with function that captures the output 
        this.stream.write = (string, encoding, fd) => {
            
            // check if buffer can be extended
            if (this.bufferSize + string.length <= this.maxBufferSize) {

                // append string to buffer
                this.buffer.push(string);
                this.bufferSize += string.length;

            } else {
                
                // extend buffer if it has not overflown previously
                if (!this.bufferOverFlow) {
                	this.buffer.push(
                        (
                            this.maxBufferSize - this.bufferSize < 3 ? 
                            '' :
                            string.slice(0, this.maxBufferSize - this.bufferSize)
                        ) 
                        + "..."
                    );
                	this.bufferSize = this.maxBufferSize;
                    
                    // indicate that a buffer overflow has occurred 
                	this.bufferOverFlow = true;
                                        
                }
                
                // throw an Error to indicate a buffer overrun
                throw new Error(`output buffer has exceeded maximal size (${
                	this.maxBufferSize.toString()
                } bytes)`;
                
            }
                
        };
        
        // return current object for chaining
        return this;
        
    }

    release() {
        
        // restore original stream writer
        this.stream.write = this.originalStreamWriter;
        
        // return current object for chaining
        return this;
        
    }

    get output() {
        
        // return string that has been written to the output stream
        return this.buffer.join('');
        
    }

}

module.exports = OutputBuffer;