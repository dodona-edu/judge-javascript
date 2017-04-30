// helper function for pretty printing values
function display(obj) {
	
    var str = "",
        keys = [],
        key, 
        i;

    if (obj === undefined) {
    	
    	// represent undefined as undefined
        return "undefined";
        
    } else if (obj === null) {
    	
    	// represent null as null
        return "null";
        
    } else if (Array.isArray(obj)) {
    	
    	// recursively convert array element to string
    	return "[" + obj.map(function(element){ return display(element); }).join(", ") + "]";
        
    } else if (typeof obj === "object") {
    	
    	// put all object keys in array
        if (obj.hasOwnProperty !== undefined && typeof obj.hasOwnProperty === "function") {
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
        
        // sort array of keys lexicographically
        keys.sort();

    	// recursively convert object key/value pairs to string
        return "{" + keys.map(function(element){ return display(element) + ": " + display(obj[element]); }).join(", ") + "}";
        
    } else if (typeof obj === "string") {
    	
    	return JSON.stringify(obj);
    	
    } else {
        	
        // pretty print general object
        return obj.toString();
        
    }
        
}

// helper function for converting Error objects to string
function displayError(e, cleanup) {
	
	var line,
	    message;
	
	// cleanup error message by default
	if (cleanup === undefined) {
		cleanup = true;
	}
	
    try {
    	
        if (typeof e === "string") {
        	
            return e;
            
        } else if (e.stack !== undefined) {
        	
        	message = [];
        	for (line of e.stack.split("\n")) {
        		
        		if (!cleanup || !line.startsWith(" ") || /^[ ^]+$/.test(line)) {
        			
        			// always include line if no cleanup is needed or if line
        			// does not start with a space
        			// NOTE: the latter is only supposed to be the header line
            		message.push(line);        			

        		} else if (line.search("<anonymous>:") !== -1) {
        			
        			// remove eval wrapping from line
					line = line.replace(
						/^    at ([^ ]+) .* <anonymous>:([0-9]+):([0-9]+).*$/, 
						function(match, func, row, col) {
							if (func === "eval") {
								return "    at <code>:" + row + ":" + col;								
							} else {
								return "    at " + func + " (<code>:" + row + ":" + col + ")";								
							}
						}
					);
					
    				message.push(line);

        		}
        	
        	}
        		
        	console.error(message.join("\n"));
        	return message.join("\n");
        	
        } else {
        	
            // format message
            if (e.name !== undefined && e.message !== undefined) {
            	
                // add line number if available
            	message = e.name;
            	if (e.lineNumber !== undefined) {
            		message += " (line " + e.lineNumber + ")";
            	}
            	message += ": " + e.message;
                
            } else {
            	
                message = "JudgeError: ill-formed Error";
                if (display(e) !== "") { 
                	message += ": " + display(e); 
                }
                
            }
            
            return message;
            
        }
        
    } catch (e) {
    	
    	// for converting Error objects to string
        return e.toString();
        
    }
    
}

function lineError(e) {
	
	var last = "";
	
	if (typeof e !== "string") {
		e = displayError(e);
	}
	
	for (var line of e.split("\n")) {
		if (!line.startsWith(" ")) {
			last = line;
		}
	}
	
	return line;
	
}

function statusError(e) {
	
	if (lineError(e) === "Error: Script execution timed out.") {
		return "time limit exceeded";
	}
	
	return "runtime error";

}

module.exports = {
    display: display,
    displayError: displayError,
    lineError: lineError,
    statusError: statusError,
};