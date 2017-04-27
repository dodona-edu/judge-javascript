process.stdin.on('data', function(data) {
	
	var fs = require('fs');
	var path = require('path')
    var judge = require('./judge.js');

	// parse JSON with configuration settings from stdin 
    var config = JSON.parse(data);
    
    // extract configuration settings
    var resourcesDir = config['resources'];
    var sourceFile = config['source'];
    
    // process tests
    var js = new judge.Judge(path.join(resourcesDir, 'tests.js'));

    // evaluate tests and output result to stdout
    console.log(js.run(sourceFile));     

});