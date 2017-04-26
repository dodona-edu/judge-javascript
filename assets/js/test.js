var fs = require('fs');
var path = require('path');

// validate feedback
var JsonSchema = require('ajv');
var jsonSchema = new JsonSchema();
var feedbackSchema = JSON.parse(fs.readFileSync(path.join('schemas', 'DodonaSubmission', 'submission.json'), 'utf8'));
var valid = jsonSchema.validate(feedbackSchema, {});
