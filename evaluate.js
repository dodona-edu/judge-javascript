(function(){

	const fs = require('fs');
	const path = require('path');
	const jsJudge = require('./judge.js');

	// config = JSON.parse((fs.readFileSync('/dev/stdin').toString()));
	var config = {resources: 'test', source: 'code.js'};

	// process tests
	var js = new jsJudge.Judge(path.join(config.resources, 'tests.short.js'));

	// evaluate tests
	var feedback = js.run(path.join(config.resources, 'code.js'));

	// output feedback on tests
	console.log(feedback);
	
}());

