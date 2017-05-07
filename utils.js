// function for pretty printing values
function display(obj) {
    
    try {
        
        // custom string conversion of object
        return recursiveDisplay(obj);
        
    } catch(e) {
        
        if (
            e.name === "RangeError" && 
            e.message === "Maximum call stack size exceeded"
        ) {
            
            // native string conversion if object has circular references
            return obj.toString();
            
        } else {
        
            // re-throw error if not due to circular references
            throw e;
            
        }
        
    }
    
}

// helper function for pretty printing values
function recursiveDisplay(obj) {
    
    if (obj === undefined) {
        
        // represent undefined as undefined
        return "undefined";
        
    } else if (obj === null) {
        
        // represent null as null
        return "null";
        
    } else if (Array.isArray(obj)) {
        
        // recursively convert array element to string
        return "[" + obj.map(element => display(element)).join(", ") + "]";
        
    } else if (typeof obj === "object") {
        
        let keys = [];
        
        // capture all object keys in an array
        if (
            obj.hasOwnProperty !== undefined && 
            typeof obj.hasOwnProperty === "function"
        ) {
            
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
            
        } else {
            
            for (let key in obj) {
                keys.push(key);
            }
            
        }
        
        // recursively convert object key/value pairs to string
        // NOTE: keys are sorted lexicographically
        return (
            "{" + 
            keys.sort().map(element => (
                display(element) + 
                ": " + 
                display(obj[element])
            )).join(", ") + 
            "}"
        );
        
    } else if (typeof obj === "string") {
        
        let s = JSON.stringify(obj);
        
        // simplify string representation: if string contains only double quotes
        // and not single quote, then use single quotes as delimiter such that
        // no escaping is neeeded
        if (s.includes("\\\"") && !s.includes("'")) {
            s = "'" + s.slice(1, -1).replace(/\\"/g, "\"") + "'";
        }
        
        return s;
        
    } else {
            
        // native string conversion if not one of the above types
        return obj.toString();
        
    }
        
}

// helper function for converting Error objects to string
function displayError(e, cleanup) {
    
    // cleanup error message by default
    if (cleanup === undefined) {
        cleanup = true;
    }
    
    try {
        
        if (typeof e === "string") {
            
            // error message was already converted to string representation
            return e;
            
        } else if (e.stack !== undefined) {
            
            // initialize array to capture lines of the stack trace
            let message = [];
            
            // filter lines of the stack trace
            for (let line of e.stack.split("\n")) {
                
                if (
                    // include all lines if no cleanup is needed
                    !cleanup ||
                    // always include non at-lines
                    //   - indicate errors themselves
                    //   - indicate where error occurs
                    !line.startsWith("    at ") ||
                    // always include lines that report errors in submitted code
                    line.includes("<code>:") || 
                    // always include lines that report errors in tests
                    line.includes("<test>:")
                ) {
                	
                    message.push(line);                    

                } 
                            
            }
                
            // reconstruct stack trace based on filtered lines
            return message.join("\n");
            
        } else {
            
            let message;
            
            // format message
            if (e.name !== undefined && e.message !== undefined) {
                
                message = e.name;
                // add line number if available
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
    
    let last = "";
    
    if (typeof e !== "string") {
        e = displayError(e);
    }
    
    for (let line of e.split("\n")) {
        if (!line.startsWith(" ")) {
            last = line;
        }
    }
    
    return last;

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