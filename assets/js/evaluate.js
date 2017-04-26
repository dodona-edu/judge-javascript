var fs = require('fs');
var path = require('path');

// config = JSON.parse((fs.readFileSync('/dev/stdin').toString()));
config = {resources: 'trash', source: 'code.js'};

// import js-judge module
var jsJudge = require('./judge.js');

// process tests
var judge = new jsJudge.Judge(
	path.join(config['resources'], 'tests.js')
);

// evaluate tests
var feedback = judge.run(path.join(config['resources'], 'code.js'));

// output feedback on tests
console.log(feedback);
