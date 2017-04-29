(function(){

	const fs = require('fs');
	const path = require('path');
	const jsJudge = require('./judge.js');

	// use configuration for testing
	var config = {resources: 'test', source: 'code.js'};

	// process tests
	var js = new jsJudge.Judge(path.join(config.resources, 'tests.js'));

	// evaluate tests
	var feedback = js.run(path.join(config.resources, 'code.js'));

	// output feedback on tests
	console.log(feedback);
	
}());

