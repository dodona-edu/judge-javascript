var fs = require('fs');
var worker = require('./workers/judge_worker.js')

function FeedbackTable(tests) {
    this.correct = 0;
    this.wrong = 0;
    this.tests = tests;
}

FeedbackTable.method = function(name, body) {
    FeedbackTable.prototype[name] = body;
}

// add row to feedback table
FeedbackTable.method('add', function (args) {
    console.log('add');
    return;

    // define row templates
    var row_base_template = '<tr class="feedback-row {type} {eval} {color}">{cols}</tr>';
    var row_span_template = row_base_template.format({
        "cols": '<td colspan="2">{content}</td>'
    });
    var row_icon_template = row_base_template.format({
        "cols": '<td class="icon"><span class="glyphicon glyphicon-{icon}" style="color:{icon-color};"></span></td><td>{content}</td>'
    });
    var row_statement = row_span_template.format({
        "type": "statement",
        "content": '&#x25BA; {content}'
    });
    var row_error = row_icon_template.format({
        "type": "error",
        "color": "danger",
        "icon": "exclamation-sign",
        "icon-color": "red"
    });
    var row_correct = row_icon_template.format({
        "type": "output",
        "icon": "ok",
        "icon-color": "green"
    });
    var row_wrong = row_icon_template.format({
        "type": "output",
        "icon": "remove",
        "icon-color": "red"
    });

    // define row types
    var row = {
        "statement": row_statement,
        "error": row_error,
        "correct": row_correct,
        "wrong": row_wrong
    };

    // define default colors types
    var color = {
        "statement": "active",
        "error": "danger",
        "AC": "success",
        "WA": "danger",
        "IE": "danger",
        "RE": "danger"
    };

    $("#feedback-table").append(row[args.type || "error"].format({
        "eval": args.eval || "IE",
        "color": args.color || color[args.type] || color[args.eval] || "danger",
        "content": args.content || "JudgeError: unknown error"
    }));

});

// show error message in feedback table
FeedbackTable.method('error', function (error) {
    console.log('error')
    return
    var feedbackTable = this;

    // show error message
    feedbackTable.add({
        "type": "error",
        "eval": "IE",
        "content": displayError(error)
    });

    // hide loading icon of feedback table
    $("#feedback-loading").hide();
});


// clear feedback table
FeedbackTable.method('clear', function () {
    console.log('clear');
    return
    // empty feedback table
    $("#feedback-table").html('');

    // initialize badges
    this.correct = 0;
    this.wrong = 0;
    $("#tests-correct").html(this.correct);
    $("#tests-wrong").html(this.wrong);

    // initialize feedback menu
    $("#feedback-menu-toggle-correct a").html('verberg correct');
});

// test submitted source code
FeedbackTable.method('test', function (args) {
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

    // clear the feedback table
    feedbackTable.clear();

    var judge = worker.Judge(code);

    // perform actions if test case has been evaluated
    judge.onmessage = function (e) {
        // adjust judge based on incoming setting
        if (e.data.type === "setting") {
            if (e.data.name === "timeout") {
                // set new timeout
                setCustomTimeout(e.data.value);
            }

            // stop further processing
            return;
        }

        // translate messages from judge into feedback table rows
        e.data.rows.forEach(function (row) {
            feedbackTable.add(row);
        });

        // increment badge corresponding to outcome of evaluation
        if (e.data.eval == "AC") {
            feedbackTable.correct += (e.data.weight || 1);
            $("#tests-correct").html(feedbackTable.correct);
        } else {
            feedbackTable.wrong += (e.data.weight || 1);
            $("#tests-wrong").html(feedbackTable.wrong);
        }

        // check if additional results are expected
        if (e.data.done) {
            // hide loading icon
            $("#feedback-loading").hide();

            // terminate the worker
            judge.terminate();

            // clear the timer
            clearTimeout(timer);
            resolve({correct: feedbackTable.correct, wrong: feedbackTable.wrong, status: "done"});
        }
    };

    judge.onerror = function (e) {
        // show error message from Web Worker
        feedbackTable.error(e);
    };

    // set default timeout
    setCustomTimeout();
    for (var i=0; i < feedbackTable.tests.length; i++) {
        eval(feedbackTable.tests[i]);
    }
    judge.run(code, tests);

    return;

    // execute source code and tests cases
    judge.postMessage({
        "source": source,
        "tests": feedbackTable.tests
    });
});

var tests = fs.readFileSync('tests.js').toString().split('\n');
var code = fs.readFileSync('code.js').toString();
var feedbackTable = new FeedbackTable(tests);
feedbackTable.test(code);



