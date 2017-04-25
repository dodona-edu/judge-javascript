var statusCodes = [
    'correct answer',
    'wrong answer',
    'segmentation error',
    'compilation error',
    'runtime error',
    'time limit exceeded',
    'memory limit exceeded',
    'unexpected end of line',
];

//
// TestError
//

TestError = function(message) {
	
    this.name = 'TestError';
    this.message = message;
    
};

TestError.prototype = Object.create(Error.prototype);
TestError.prototype.constructor = TestError;

//
// Message
//

var Message = function(properties) {
	
	// set default values
	this.properties = {
		description: '',
		format: 'text'
	}
	
	// overwrite with specific values
	for (var property in properties) {
		this.properties[property] = properties[property];
	}
	
};

Message.prototype.toJson = function() {
	
	return this.properties;
	
};

//
// Test
//

var Test = function(properties, parent) {
    
    // TODO: check object properties using JSON schema
    //
    // base
    //     description: string or message
    //     messages: array of messages
    //     data: object
    // acceptance
    //     accepted (required): boolean
    //     status (required): string
    //     score: float (>= 0.0)
    //     maximal_score: float (>= 0.0)
    // outcome
    //     expected
    //     generated

    // object properties
    this.properties = {'status': 'correct answer'};
    this.parent = parent || null;
    
    // set default status
    this.setStatus('correct answer');

    // set other properties
    this.update(properties);
    
};

Test.prototype.update = function(properties) {
    
    for (var property in properties) {
        if (property === 'status') {
            this.setStatus(properties[property]);
        } else {
            this.setProperty(property, properties[property]);
        }
    }        
    
}

Test.prototype.hasProperty = function(name) {
    return this.properties.hasOwnProperty(name);
};

Test.prototype.getProperty = function(name) {
    
    if (this.properties.hasOwnProperty(name)) {
        return this.properties[name];        
    }
    
    throw new TestError('unknown property');
};

Test.prototype.setAccepted = function(value) {

    // set acceptance of current object
    if (value === false) {
        this.properties['accepted'] = value;
    }
    
    // recursively call function on parent
    if (this.parent !== null) {
        Test.prototype.setAccepted.call(this.parent, value);
    }
    
};
    
Test.prototype.setStatus = function(value) {

    var index1, index2;

    // update object status
    index1 = statusCodes.indexOf(value);
    if (index1 === -1) {
        throw new TestError('invalid status "' + value + '"');
    }
    if (this.hasProperty('status')) {
        index2 = statusCodes.indexOf(this.properties['status']);
    }
    if (index2 === -1 || index2 === undefined || index1 > index2) {
        // only update status in case it was not set before or in case it is
        // more severe than the previous status
        this.properties['status'] = value;
    }
    
    // update object acceptance according to status
    this.setAccepted(this.getProperty('status') === 'correct answer');
    
    // recursively call function on parent
    if (this.parent !== null) {
        Test.prototype.setStatus.call(this.parent, value);
    }
    
};
    
Test.prototype.setProperty = function(name, value) {
    
    // update status of parent object
    if (name === 'status') {
        this.setStatus(value);
    } else if (name === 'accepted') {
        this.setAccepted(value);        
    } else {
        this.properties[name] = value;        
    }
    
    return this;
    
};
    
Test.prototype.getParent = function() {
    return this.parent;
};
    
Test.prototype.setParent = function(parent) {
    this.parent = parent;
    return this;
};

Test.prototype.toJson = function() {
    
    var json = {};
    
    for (var property in this.properties) {
        if (this.hasProperty(property)) {
            if (property === 'groups' || property === 'tests') {
                json[property] = this.getProperty(property).map(
                    function(element) { 
                        return Test.prototype.toJson.call(element); 
                    }
                );
            } else if (property === 'message') {
            	json[property] = this.getProperty(property).map(
            		function(element) { return element.toJson(); }
            	);
            } else {
                json[property] = this.getProperty(property);
            }
        }
    }
    
    return json;
};
    
Test.prototype.toString = function() {
    return JSON.stringify(this.toJson(), null, 4);
};

Test.prototype.addMessage = function(message) {
	
    // add message property if not present
	if (!this.hasProperty('message')) {
		this.setProperty('message', []);
	}
	
	// add message to list of messages
	this.getProperty('message').push(message);
	
}
    
//
// TestGroup
//

var TestGroup = function(properties, parent) {
    
    // TODO: check object properties using JSON schema
    //
    // base
    //     description: string or message
    //     messages: array of messages
    //     data: object
    // acceptance
    //     accepted (required): boolean
    //     status (required): string
    //     score: float (>= 0.0)
    //     maximal_score: float (>= 0.0)
    // access
    //     permission: string (["student", "staff", "zeus", "admin"])
    // runtime metrics
    //     wall_time: float (>= 0.0)
    //     peak_memory: float (>= 0.0)
    // representation
    //     show_stacked
    //     show_merged
    //     show_accepted
    //     show_line_numbers
    //     toggle_accepted
    //     toggle_line_numbers
    // substructures
    //     groups
    //     tests
    
    // call super constructor
    Test.call(this, properties, parent);
    
};
TestGroup.prototype = Object.create(Test.prototype);
TestGroup.prototype.constructor = TestGroup;

TestGroup.prototype.hasGroups = function() {

    // add groups property if not present
    if (!this.hasProperty('groups')) {
        return false;
    }
    
    return this.getProperty('groups').length !== 0;

};

TestGroup.prototype.hasTests = function() {

    // add groups property if not present
    if (!this.hasProperty('tests')) {
        return false;
    }
    
    return this.getProperty('tests').length !== 0;

};

TestGroup.prototype.addGroup = function(group) {
    
    // add groups property if not present
    if (!this.hasProperty('groups')) {
        this.setProperty('groups', [])
    }
    
    // set parent of group
    group.setParent(this);
    
    // append group to groups
    this.getProperty('groups').push(group);
    
    // update status of test group according to status of group
    if (group.hasProperty('status')) {
        this.setStatus(group.getProperty('status'));
    }
    
    // update accepted of test group according to status of group
    if (group.hasProperty('accepted')) {
        this.setAccepted(group.getProperty('accepted'));
    }
    
    return this;

};

TestGroup.prototype.clearGroups = function(group) {
    if (this.hasProperty('groups')) {
    	this.getProperty('groups').length = 0;
    }
}

TestGroup.prototype.getLastGroup = function() {

    // add groups property if not present
    if (!this.hasGroups()) {
        throw new TestError('no groups')
    }
    
    // append test to tests
    var groups = this.getProperty('groups');
    
    // add groups property if not present
    if (groups.length === 0) {
        throw new TestError('no groups')
    }
    
    return groups[groups.length - 1];

};

TestGroup.prototype.addTest = function(test) {
    
    // add tests property if not present
    if (!this.hasProperty('tests')) {
        this.setProperty('tests', [])
    }
    
    // set parent of test
    test.setParent(this);
    
    // append test to tests
    this.getProperty('tests').push(test);
    
    // update status of test group according to status of test
    if (test.hasProperty('status')) {
        this.setStatus(test.getProperty('status'));
    }
    
    // update accepted of test group according to status of group
    if (test.hasProperty('accepted')) {
        this.setAccepted(test.getProperty('accepted'));
    }
    
    return this;

};

TestGroup.prototype.clearTests = function(group) {
    if (this.hasProperty('tests')) {
    	this.getProperty('tests').length = 0;
    }
}

TestGroup.prototype.getLastTest = function() {

    // add groups property if not present
    if (!this.hasTests()) {
        throw new TestError('no tests')
    }
    
    // append test to tests
    var tests = this.getPropery('tests');
    
    // add groups property if not present
    if (tests.length === 0) {
        throw new TestError('no tests')
    }
    
    return tests[tests.length - 1];

};

TestGroup.prototype.getGroups = function() {
    
    // add groups property if not present
    if (!this.hasGroups()) {
        throw new TestError('no groups')
    }
    
    return this.getPropery('groups');

};

TestGroup.prototype.getTests = function() {
    
    // add groups property if not present
    if (!this.hasTests()) {
        throw new TestError('no tests')
    }
    
    return this.getPropery('tests');

};

TestGroup.prototype[Symbol.iterator] = function() {
    
    return {
        next: function() {
            if (this.index < this.array.length) {
                this.index += 1;
                return { value: this.array[this.index - 1], done: false };
            } else {
                return { done: true };
            }
        },
        array: [].concat(this.getProperty('groups')),
        index: 0
    };

};

//
// TestCase
//

var TestCase = function(properties, parent) {
    
    // call super constructor
    TestGroup.call(this, properties, parent);
    
};
TestCase.prototype = Object.create(TestGroup.prototype);
TestCase.prototype.constructor = TestCase;

TestCase.prototype[Symbol.iterator] = function() {
    
    return {
        next: function() {
            if (this.index < this.array.length) {
                this.index += 1;
                return { value: this.array[this.index - 1], done: false };
            } else {
                return { done: true };
            }
        },
        array: [].concat(this.getProperty('tests')),
        index: 0
    };

};

//
// Context
//

var Context = function(properties, parent) {
    
    // call super constructor
    TestGroup.call(this, properties, parent);
    
};
Context.prototype = Object.create(TestGroup.prototype);
Context.prototype.constructor = Context;

Context.prototype.addTestCase = function(testcase) {
    
    return this.addGroup(testcase);
    
};

Context.prototype.addTest = function(test) {
    
    // make sure context contains at least one testcase
    if (!this.hasGroups()) {
        this.addTestCase(new TestCase({}, this));
    }
    
    // add test to last group (contest)
    this.getLastGroup().addTest(test);
    
    return this;
    
};

//
// Tab
//

var Tab = function(properties, parent) {
    
    // call super constructor
    TestGroup.call(this, properties, parent);
    
};
Tab.prototype = Object.create(TestGroup.prototype);
Tab.prototype.constructor = Tab;

Tab.prototype.addContext = function(context) {
    
    return this.addGroup(context);
    
};

Tab.prototype.addTestCase = function(testcase) {
    
    // make sure tab contains at least one context
    if (!this.hasGroups()) {
        this.addContext(new Context({}, this));
    }
    
    // add context to last group (tab)
    this.getLastGroup().addGroup(testcase);
    
    return this;
    
};

Tab.prototype.addTest = function(test) {
    
    // make sure tab contains at least one context
    if (!this.hasGroups()) {
        this.addContext(new Context({}, this));
    }
    
    // add test to last group (contest)
    this.getLastGroup().addTest(test);
    
    return this;
    
};

//
// Submission
//

var Submission = function(properties) {
    
    // call super constructor
    TestGroup.call(this, properties, null);
    
};
Submission.prototype = Object.create(TestGroup.prototype);
Submission.prototype.constructor = Submission;

Submission.prototype.addTab = function(tab) {
    this['groups'].push(tab)
};

Submission.prototype.addTab = function(tab) {
    
    return this.addGroup(tab);
    
};

Submission.prototype.addContext = function(context) {
    
    // make sure submission contains at least one tab
    if (!this.hasGroups()) {
        this.addTab(new Tab({}, this));
    }
    
    // add context to last group (tab)
    this.getLastGroup().addGroup(context);
    
    return this;
    
};

Submission.prototype.addTestCase = function(testcase) {
    
    // make sure submission contains at least one tab
    if (!this.hasGroups()) {
        this.addTab(new Tab({}, this));
    }
    
    // add context to last group (tab)
    this.getLastGroup().addTestCase(testcase);
    
    return this;
    
};

Submission.prototype.addTest = function(test) {
    
    // make sure submission contains at least one tab
    if (!this.hasGroups()) {
        this.addTab(new Tab({}, this));
    }
    
    // add test to tab
    this.getLastGroup().addTest(test);
    
    return this;
    
};

module.exports = {
    Message: Message,
    Submission: Submission,
    Tab: Tab,
    Context: Context,
    TestCase: TestCase,
    Test: Test
};