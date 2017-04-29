var assert = require('assert');

functions f() {
	assert(false, "raised on purpose");
}

function g() {
	f();
}

function h() {
	g();
}

h();