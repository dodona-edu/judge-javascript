// helper function to dynamically attach method to Function prototype
function dynamicMethodLoader(name, func) {

    // attach given function to prototype attribute having the given name, in
    // case prototype did not had attribute with the given name
    if (!this.prototype.hasOwnProperty(name)) {
        Object.defineProperty(
            this.prototype,
            name, {
                value: func,
                enumerable: false
            }
        );
    }

    // return Function instance to allow chaining of method calls
    return this;
}

// attach helper function to Function prototype as method with name "method"
dynamicMethodLoader.call(Function, 'method', dynamicMethodLoader);

// new string method that replaces in a string all placeholders having format
// {name} by the value mapped from "name" by the object that is passed as an
// argument to the method; the placeholder is not replaced if the passed object
// has not property "name"
String.method('format', function (dict) {
    return this.replace(/{([^{}]*)}/g, function (match, naam) {
        var waarde = dict[naam];
        return waarde !== undefined ? waarde.toString() : match;
    });
});

// helper function for pretty printing values
function display(obj) {
	
    var str = '',
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
    	return '[' + obj.map(function(element){ return display(element); }).join(', ') + ']';
        
    } else if (typeof obj === 'object') {
    	
    	// put all object keys in array
        if (obj.hasOwnProperty !== undefined && typeof obj.hasOwnProperty === 'function') {
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
        return '{' + keys.map(function(element){ return display(element) + ": " + display(obj[element]); }) + '}'
        
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
	
	var message;
	
    try {
        if (typeof e === "string") {
            return e;
        } else if (e.stack !== undefined) {
        	return e.stack;
        } else {
            // format message
            if (e.name !== undefined && e.message !== undefined) {
                // add line number if available
            	message = e.lineNumber === undefined ? "{name}: {message}" : "{name} (line {line}): {message}" 
                message = message.format({
                    name: e.name,
                    message: e.message,
                    line: e.lineNumber
                });
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

module.exports = {
    display: display,
    displayError: displayError
};
