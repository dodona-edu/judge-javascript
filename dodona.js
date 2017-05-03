//
// Message
//

var Message = function(properties) {
	
	this.properties = Object.assign(
		// set default values
		{
			description: "",
			format: "text"
		},
		// overwrite with specific values
		properties
	);
	
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
    this.parent = parent || null;
    this.properties = {};
    this.update(
    	Object.assign(
		    // default status
			{ status: "unprocessed" },
		    // overwrite or add given properties
			properties
		)
    );
    
};

Test.prototype.hasProperty = function(name) {
	
	// check if object has a property with the given name
    return this.properties.hasOwnProperty(name);
    
};

Test.prototype.getProperty = function(name) {
    
	// check if object has a property with the given name
    if (this.properties.hasOwnProperty(name)) {
        return this.properties[name];        
    }
  
	// report that object has no property with the given name
    throw new Error("unknown property \"" + name + "\"");
};

Test.prototype.setAccepted = function(value) {

    // set acceptance of current object
    if (!this.hasProperty("accepted") || value === false) {
        this.properties["accepted"] = value;
    }
    
    // recursively call function on parent
    if (this.parent !== null) {
        Test.prototype.setAccepted.call(this.parent, value);
    }
    
};
    
Test.prototype.setStatus = function(value) {

    var index1, index2;

    // define the order of severity of status codes
    const statusCodes = [
	    "unprocessed",
	    "correct answer",
	    "wrong answer",
	    "runtime error",
	    "segmentation error",
	    "unexpected end of line",
	    "memory limit exceeded",
	    "time limit exceeded",
	    "compilation error",
	];
    
    // update object status
    index1 = statusCodes.indexOf(value);
    if (index1 === -1) {
        throw new Error("invalid status \"" + value + "\"");
    }
    if (this.hasProperty("status")) {
        index2 = statusCodes.indexOf(this.properties["status"]);
    }
    if (index2 === -1 || index2 === undefined || index1 > index2) {
        // only update status in case it was not set before or in case it is
        // more severe than the previous status
        this.properties["status"] = value;
    }
    
    // update object acceptance according to status
    this.setAccepted(
    	["unprocessed", "correct answer"].includes(this.getProperty("status"))
    );
    
    // recursively call function on parent
    if (this.parent !== null) {
        Test.prototype.setStatus.call(this.parent, value);
    }
    
};
    
Test.prototype.setProperty = function(name, value) {
    
    // update status of parent object
    if (name === "status") {
        this.setStatus(value);
    } else if (name === "accepted") {
        this.setAccepted(value);        
    } else {
        this.properties[name] = value;        
    }
    
    return this;
    
};
    
Test.prototype.update = function(properties) {
    
    for (var property in properties) {
        if (property === "status") {
            this.setStatus(properties[property]);
        } else {
            this.setProperty(property, properties[property]);
        }
    }        
    
}

Test.prototype.deleteProperty = function(name) {
	
	if (this.hasProperty(name)) {
	    delete this.properties[name];		
	}
	
    return this;
    
};
    
Test.prototype.hasParent = function() {
	
    return this.parent !== null;

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
            if (property === "groups" || property === "tests") {
                json[property] = this.getProperty(property).map(
                    function(element) { 
                        return Test.prototype.toJson.call(element); 
                    }
                );
            } else if (property === "messages") {
            	json[property] = this.getProperty(property).map(
            		function(element) { return element.toJson(); }
            	);
            } else if (
            	property === "description" &&
            	typeof this.getProperty(property) === "object"
            ) {
            	json[property] = this.getProperty(property).toJson();
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

Test.prototype.hasMessages = function() {

    // add groups property if not present
    if (!this.hasProperty("messages")) {
        return false;
    }
    
    return this.getProperty("messages").length !== 0;

};

Test.prototype.addMessage = function(message) {
	
    // add message property if not present
	if (!this.hasProperty("messages")) {
		this.setProperty("messages", []);
	}
	
	// add message to list of messages
	this.getProperty("messages").push(message);
	
    // return object for chaining purposes
	return this;
	
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
    if (!this.hasProperty("groups")) {
        return false;
    }
    
    return this.getProperty("groups").length !== 0;

};

TestGroup.prototype.hasTests = function() {

    // add groups property if not present
    if (!this.hasProperty("tests")) {
        return false;
    }
    
    return this.getProperty("tests").length !== 0;

};

TestGroup.prototype.addGroup = function(group) {
    
    // add groups property if not present
    if (!this.hasProperty("groups")) {
        this.setProperty("groups", [])
    }
    
    // set parent of group
    group.setParent(this);
    
    // append group to groups
    this.getProperty("groups").push(group);
    
    // update status of test group according to status of group
    if (group.hasProperty("status")) {
        this.setStatus(group.getProperty("status"));
    }
    
    // update accepted of test group according to status of group
    if (group.hasProperty("accepted")) {
        this.setAccepted(group.getProperty("accepted"));
    }
    
    // return object for chaining purposes
    return this;

};

TestGroup.prototype.clearGroups = function(group) {
	
    if (this.hasProperty("groups")) {
    	this.getProperty("groups").length = 0;
    }
    
}

TestGroup.prototype.getLastGroup = function() {

    // add groups property if not present
    if (!this.hasGroups()) {
        throw new Error("no groups");
    }
    
    // append test to tests
    var groups = this.getProperty("groups");
    
    // add groups property if not present
    if (groups.length === 0) {
        throw new Error("no groups")
    }
    
    return groups[groups.length - 1];

};

TestGroup.prototype.addTest = function(test) {
    
    // add tests property if not present
    if (!this.hasProperty("tests")) {
        this.setProperty("tests", [])
    }
    
    // set parent of test
    test.setParent(this);
    
    // append test to tests
    this.getProperty("tests").push(test);
    
    // update status of test group according to status of test
    if (test.hasProperty("status")) {
        this.setStatus(test.getProperty("status"));
    }
    
    // update accepted of test group according to status of group
    if (test.hasProperty("accepted")) {
        this.setAccepted(test.getProperty("accepted"));
    }
    
    // return object for chaining purposes
    return this;

};

TestGroup.prototype.clearTests = function(group) {
	
    if (this.hasProperty("tests")) {
    	this.getProperty("tests").length = 0;
    }
    
}

TestGroup.prototype.getLastTest = function() {

    // add groups property if not present
    if (!this.hasTests()) {
        throw new Error("no tests");
    }
    
    // append test to tests
    var tests = this.getPropery("tests");
    
    // add groups property if not present
    if (tests.length === 0) {
        throw new Error("no tests");
    }
    
    return tests[tests.length - 1];

};

TestGroup.prototype.getGroups = function() {
    
    // add groups property if not present
    if (!this.hasProperty("groups")) {
        throw new Error("no groups");
    }
    
    return this.getProperty("groups");

};

TestGroup.prototype.getTests = function() {
    
    // add groups property if not present
    if (!this.getProperty("tests")) {
        throw new Error("no tests");
    }
    
    return this.getProperty("tests");

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
        array: [].concat(this.hasProperty("groups") ? this.getProperty("groups") : []),
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
        array: [].concat(this.hasProperty("tests") ? this.getProperty("tests") : []),
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
    
    // return object for chaining purposes
    return this.addGroup(testcase);
    
};

Context.prototype.addTest = function(test) {
    
    // make sure context contains at least one testcase
    if (!this.hasGroups()) {
        this.addTestCase(new TestCase({}, this));
    }
    
    // add test to last group (contest)
    this.getLastGroup().addTest(test);
    
    // return object for chaining purposes
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
    
    // return object for chaining purposes
    return this.addGroup(context);
    
};

Tab.prototype.addTestCase = function(testcase) {
    
    // make sure tab contains at least one context
    if (!this.hasGroups()) {
        this.addContext(new Context({}, this));
    }
    
    // add context to last group (tab)
    this.getLastGroup().addGroup(testcase);
    
    // return object for chaining purposes
    return this;
    
};

Tab.prototype.addTest = function(test) {
    
    // make sure tab contains at least one context
    if (!this.hasGroups()) {
        this.addContext(new Context({}, this));
    }
    
    // add test to last group (contest)
    this.getLastGroup().addTest(test);
    
    // return object for chaining purposes
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
    
    // return object for chaining purposes
    return this.addGroup(tab);
    
};

Submission.prototype.addContext = function(context) {
    
    // make sure submission contains at least one tab
    if (!this.hasGroups()) {
        this.addTab(new Tab({}, this));
    }
    
    // add context to last group (tab)
    this.getLastGroup().addGroup(context);
    
    // return object for chaining purposes
    return this;
    
};

Submission.prototype.addTestCase = function(testcase) {
    
    // make sure submission contains at least one tab
    if (!this.hasGroups()) {
        this.addTab(new Tab({}, this));
    }
    
    // add context to last group (tab)
    this.getLastGroup().addTestCase(testcase);
    
    // return object for chaining purposes
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