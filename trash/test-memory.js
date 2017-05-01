const vm = require('vm');

code =  `
var array = [['spam', 'eggs', 'bacon', 'shrubbery']];

var i;
while (true) {
	array.push(array[0]);
	for (i = 0; i < array.length; i += 1)
		array[i] = array[i].concat(array[i]);
}
`


try {
	
	const scope = {};
	vm.createContext(scope);
	vm.runInContext(code, scope);

} catch(e) {
	
	console.log(e);
	
}

