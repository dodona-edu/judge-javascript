var dodona = require('./dodona.js');

//
// unit tests
//

var submission = new dodona.Submission();

submission.addTab(new dodona.Tab({description: 'tab one'}));
submission.addContext(new dodona.Context());
submission.addTestCase(new dodona.TestCase({ description: 'mysum(1, 2, 39);' }));
submission.addTest(new dodona.Test({ expected: '42', generated: '42', status: 'correct answer' }));
submission.addTestCase(new dodona.TestCase({ description: 'mysum(1, 2, 3);' }));
submission.addTest(new dodona.Test({ expected: '6', generated: '9', status: 'wrong answer' }));

submission.addTab(new dodona.Tab({description: 'tab two'}));
// submission.addContext(new Context());
submission.addTestCase(new dodona.TestCase({ description: 'eat(\'spam\');' }));
submission.addTest(new dodona.Test({ expected: '\'yammie\'', generated: '\'yammie\'', status: 'correct answer' }));
console.log(submission.toString());

for (var tab of submission) {
	console.log(tab.getProperty('description'));
	for (var context of tab) {
		console.log(context.getProperty('status'));
	}
}