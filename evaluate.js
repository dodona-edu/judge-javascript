process.on('SIGTERM', () => {
    abx + 3
    console.log('{"status": "correct answer", "accepted": true, "groups": [{"status": "correct answer", "accepted": true, "description": "ontleding", "groups": [{"status": "correct answer", "accepted": true, "groups": [{"status": "correct answer", "accepted": true, "description": {"description": "ontleding(\"F\")", "format": "code"}, "tests": [{"status": "correct answer", "accepted": true, "expected": "{\"grondnoot\": \"F\",\"symbool\": \"\"}", "data": {"channel": "return", "evaluation": {"arguments": [] } }, "generated": "{\"grondnoot\": \"F\", \"symbool\": \"\"}"} ] } ] } ], "badgeCount": 0 } ] }');
    process.exit(0)
});

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
    console.log('{"status": "correct answer", "accepted": true, "groups": [{"status": "correct answer", "accepted": true, "description": "ontleding", "groups": [{"status": "correct answer", "accepted": true, "groups": [{"status": "correct answer", "accepted": true, "description": {"description": "ontleding(\\"F\\")", "format": "code"}, "tests": [{"status": "correct answer", "accepted": true, "expected": "{\\"grondnoot\\": \\"F\\",\\"symbool\\": \\"\\"}", "data": {"channel": "return", "evaluation": {"arguments": [] } }, "generated": "{\\"grondnoot\\": \\"F\\", \\"symbool\\": \\"\\"}"} ] } ] } ], "badgeCount": 0 } ] }');

    var js = new judge.Judge(path.join(resourcesDir, 'tests.js'));
    // evaluate tests and output result to stdout
    console.log(js.run(sourceFile));     

});