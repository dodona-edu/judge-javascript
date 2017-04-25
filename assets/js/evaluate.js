fs=require('fs');
config = JSON.parse((fs.readFileSync('/dev/stdin').toString()));

// import js-judge module
var jsJudge = require('./judge.js');

// process tests
<<<<<<< HEAD
var js = new jsJudge.Judge('tests.js');
=======
var js = new jsJudge.Judge(config['resources'] + 'tests.js');
>>>>>>> branch 'dodona-version' of git@github.ugent.be:dodona/judge-javascript.git

// evaluate tests
console.log(js.run(config['source']));
