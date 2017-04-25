// import js-judge module
var jsJudge = require('./judge.js');

// process tests
var js = new jsJudge.Judge('tests.js');

// evaluate tests
console.log(js.run('code.js'));