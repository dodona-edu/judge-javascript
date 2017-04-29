var fs = require('fs');
var path = require('path');
var linter = require("eslint").linter;

// read source code from file
var code = fs.readFileSync('code.js').toString();
var config = fs.readFileSync('eslint.config.json').toString();

// lint source code
var messages = linter.verify(code, config);
console.log(messages);