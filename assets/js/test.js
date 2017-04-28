const fs = require('fs');
const path = require('path');

var code = fs.readFileSync(path.join('trash', 'code.js')).toString();
eval(code);