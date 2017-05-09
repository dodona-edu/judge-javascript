const fork = require("child_process").fork;
var child = fork(
	"./test-interactive-javascript.js",
	{
		silent: true
	}
);

child.on("message", (message) => {
	console.log(`PARENT got message: ${JSON.stringify(message)}`);
});

child.on("error", (err) => {
	console.error(`CHILD observed error "${err}"`);
});

child.on("kill", (err) => {
	console.error(`CHILD crashed`);
});

child.on("exit", (code, signal) => {
	console.error(`CHILD process exited with code ${code} (signal ${signal})`);
});

child.on("close", (code, signal) => {
	console.error(`CHILD process closed with code ${code} (signal ${signal})`);
});

child.stdout.on('data', (data) => {
	  console.log(`CHILD stdout: ${data}`);
	});

child.stderr.on('data', (data) => {
	  console.error(`CHILD stderr: ${data}`);
	});

// initialize sandbox
child.send({ action: 'sandbox' });

child.send({ action: 'function', comparator: "test" });

/*
child.send({ action: 'execute', statement: 'x = 3;' });

// this is a memory bomb
code =  `
var array = [['spam', 'eggs', 'bacon', 'shrubbery']];

var i;
while (true) {
	array.push(array[0]);
	for (i = 0; i < array.length; i += 1)
		array[i] = array[i].concat(array[i]);
}
`
child.send({ action: 'execute', statement: code });
*/

// console.log(child);
// console.log(eval("child"));
