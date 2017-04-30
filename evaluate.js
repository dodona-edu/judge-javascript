(function(){

	const path = require("path");
	const Judge = require("./judge.js").Judge;

	// use configuration for testing
	const config = {resources: "test", source: "code.js"};

	// process tests
	const judge = new Judge(
		path.join(config.resources, "tests.short.js"),
		{
			time_limit: 1000,  // time limit in milliseconds
		}
	);

	// evaluate tests
	judge.run(path.join(config.resources, "code.js"));
	
}());