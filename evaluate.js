var path = require('path')
var fs=require('fs');


process.stdin.on('data', function(data) {
    config = JSON.parse(data);
    // import js-judge module
    var jsJudge = require('./judge.js');

    // process tests
    var js = new jsJudge.Judge(path.join(config['resources'], 'tests.js'));

    // evaluate tests
    console.log(js.run(config['source']));     
})

