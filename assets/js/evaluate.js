var fs = require('fs');

// config = JSON.parse((fs.readFileSync('/dev/stdin').toString()));
config = {resources: 'trash/', source: 'code.js'};

// import js-judge module
var jsJudge = require('./judge.js');

// process tests
var judge = new jsJudge.Judge(
	config['resources'] + 'tests.short.js'
);

// evaluate tests
var feedback = judge.run(config['source']);

// output feedback on tests
console.log(feedback);
