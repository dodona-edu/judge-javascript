var assert = require('assert');
var x = 'spam';

function f() {
	assert(false, "raised on purpose");
}

function g() {
	f();
}

function h() {
	g();
}

// h();