var fs = require('fs');
var worker = require('./workers/judge_worker.js')
var parallel = require('dimas-parallel');

function FeedbackTable(tests) {
    this.correct = 0;
    this.wrong = 0;
    this.tests = tests;
}

// test submitted source code
FeedbackTable.prototype.test = function (args) {
    var feedbackTable = this;
    var source = args.source || '';
    var currentStatement;

    // use timer to avoid infinite loops or source code executing too slow
    var timer;

    // helper function to set custom timeout
    function setCustomTimeout(ms) {
        ms = ms || 10 * 1000; // default timeout after 10 seconds

        // clear previous timer
        clearTimeout(timer);

        // set new timeout to abort code execution after ms milliseconds
        timer = setTimeout(function () {
            // terminate the worker
            judge.terminate();

            // issue error message
            feedbackTable.error("JudgeError: time limit exceeded");
            resolve({status: "timeout"});
        }, ms);

    }
    var judge = worker.Judge(code);

    // set default timeout
    setCustomTimeout();
    for (var i=0; i < feedbackTable.tests.length; i++) {
        eval(feedbackTable.tests[i]);
    }

    result = judge.run(code, tests);
    console.log(result);
    clearTimeout(timer);
    return;
};

var tests = fs.readFileSync('tests.js').toString().split('\n');
var code = fs.readFileSync('code.js').toString();
var feedbackTable = new FeedbackTable(tests);
feedbackTable.test(code);



