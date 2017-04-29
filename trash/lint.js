var fs = require('fs');
var path = require('path');
var SourceCode = require("eslint").SourceCode;
var linter = require("eslint").linter;
var CLIEngine = require("eslint").CLIEngine;

// read source code from file
var code = fs.readFileSync(path.join('..', 'test', 'code.js'), 'utf8');
var config = JSON.parse(fs.readFileSync(path.join('..', 'config.eslint.json')), 'utf8');

// lint source code
var messages = linter.verify(
	code, 
	config,
	{
		filename: "<code>",
		allowInlineConfig: false
	}
);
console.log(JSON.stringify(messages, null, '    '));

/*
// call command line interface
var report = new CLIEngine(config).executeOnText(code);
console.log(JSON.stringify(report, null, '    '));
*/