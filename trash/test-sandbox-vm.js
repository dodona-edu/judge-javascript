const fs = require("fs");
const vm = require('vm');
const path = require("path");

// start timer to determine the remaining time
var startTime = new Date();
var timeout = 1000;

// read submitted source code from file
const code = fs.readFileSync(path.join('..', 'test', 'code.js'), 'utf8');

// define options
var options = {
	filename: "<code>",
	lineOffset: 0,
	columnOffset: 0,
	displayErrors: true,
	timeout: Math.max(1, timeout - (new Date() - startTime)),
};

// pre-compile submitted source code
// TODO: catch runtime errors
const script = new vm.Script(code, options);

// create sandbox
const scope = {
	require: require,
	console: console,
};
const sandbox = new vm.createContext(scope);

// execute submitted source code in sandbox
var result;
console.log("statement: <code>");
// console.log(code);
try {
	options.timeout = Math.max(1, timeout - (new Date() - startTime));
	result = script.runInContext(sandbox, options);
	console.log("return: " + JSON.stringify(result));	
} catch(e) {
	console.log("exception:");
	console.log(e);
}

// define statements
var statements = [
	"x = 1; y = 42;",
	"x += 3;",
	"console.log(x);",
	"console.log(y);",
	"for(var i = 0; i < 10; i += 1){ console.log('hello'); }",
	"var dobbel01 = new Dobbelsteen();",
	"dobbel01.bovenkant();",
	"while(true){};",
	"process.exit();",
	"var fs = require(\"fs\");",
];

// run statements in sandbox
var statement;
for (statement of statements) {

	// separate from previous statement
	console.log("----------------------------------------------------------");
	console.log("statement: " + statement)

	// compile and execute the statement
	try {
		result = vm.runInContext(statement, sandbox, options);
		console.log("return: " + JSON.stringify(result));	
	} catch(e) {
		console.log("exception:");
		console.log(e);
	}
	
}

// show sandbox after execution
console.log("----------------------------------------------------------");
console.log("scope:");
console.log(JSON.stringify(scope, null, '    '));