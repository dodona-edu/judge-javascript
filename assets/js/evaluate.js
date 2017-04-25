fs=require('fs');
config = JSON.parse((fs.readFileSync('/dev/stdin').toString()));

// import js-judge module
var jsJudge = require('./judge.js');

// process tests
var js = new jsJudge.Judge(config['resources'] + 'tests.js');

// evaluate tests
console.log(js.run(config['source']));
