var fs = require("fs");
var path = require("path");

// import sandbox package
const {NodeVM, VMScript} = require('vm2');

// read source code from file
var code = fs.readFileSync(path.join('..', 'test', 'code.js'), 'utf8');

// define sandbox
var sandbox = new NodeVM({
	console: "redirect",
	sandbox: {},
	compiler: "javascript",
	timeout: 1000,
    nesting: false,
    wrapper: "none",
    buffer: new Buffer([0x01, 0x05]),
    require: {
        external: false,
        builtin: [
            'fs', 
            'path'
        ],
    },
});

// pre-compile submitted source code
var result;
var script = new VMScript(code);
console.log("statement: <code>");
// console.log(code);
try {
	result = sandbox.run(script);
	console.log("return: " + JSON.stringify(result));	
} catch(e) {
	console.log(e);
}
// console.log(code);

// define statements
statements = [
	"x = 1; y = 42;",
	"x += 3;",
	"console.log(x);",
	"console.log(y);",
	"for(var i=0; i<100; i+=1){ console.log('hello'); }",
//	"dobbel01.bovenkant();",
//	"process.exit();",
//"var fs = require(\"fs\");",
//	"while(true){};",
	"var dobbel01 = new Dobbelsteen();",
];

// run statements in sandbox
for (statement of statements) {

	// separate from previous statement
	console.log("----------------------------------------------------------");
	console.log("statement: " + statement)
	try {
		result = sandbox.run(statement);
		console.log("return: " + JSON.stringify(result));	
	} catch(e) {
		console.log("exception:");
		console.log(e);
	}
	
}