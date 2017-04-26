var fs = require('fs');
var path = require('path')

process.stdin.on('data', function(data) {
	
	// parse JSON with configuration settings from stdin 
    var config = JSON.parse(data);
    
    // extract configuration settings
    var resourcesDir = config['resources'];
    var sourceFile = config['source'];
    
    // import js-judge module
    var jsJudge = require('./judge.js');

    // process tests
    var js = new jsJudge.Judge(path.join(resourcesDir, 'tests.js'));

    // evaluate tests and output result to stdout
    console.log(js.run(sourceFile));     

});