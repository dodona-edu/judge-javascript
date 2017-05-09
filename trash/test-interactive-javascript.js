function test() {
	return 3;
}

let sandbox = '';

process.on("message", (message) => {

	console.log(`CHILD got message of type ${message.action}`);

	if (message.action === "sandbox") {
		process.send({ message: "sandbox created" });
	} else if (message.action === "execute") {
		eval(message.statement);
		process.send({ message: "statement executed" });
	} else if (message.action === "function") {
		process.send({ message: eval(message.comparator)() });
	}

});

/*
function memUsage() {
	process.send({ memUsage: process.memoryUsage() });
	setTimeout(memUsage, 1);
}

memUsage();
*/