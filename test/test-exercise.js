const fs = require("fs");
const path = require("path")
const Judge = require("../judge.js").Judge;

// parse JSON with configuration settings from stdin
const data = fs.readFileSync("./config.json", "utf8")
const config = JSON.parse(data);

// extract configuration settings
const opgave = "bitcoins";
const opgaven = path.join("..", "..", "javascript-oefeningen", "opgaven", opgave);
const resourcesDir = path.join(opgaven, "evaluation");
const sourceFile = path.join(opgaven, "solution", "solution.nl.js");
const timeLimit = config["time_limit"];
const memoryLimit = config["memory_limit"];
const naturalLanguage = config["natural_language"];
const programmingLanguage = config["programming_language"];

// process tests
const judge = new Judge(
    path.join(resourcesDir, "tests.js"),
    {
        // convert time limit from seconds to millisecond and only consume
        // 90% of the available time in order to have some spare time to
        // generate the feedback on stdout
        time_limit: Math.floor(timeLimit * 900),
        memory_limit: memoryLimit,
        natural_language: naturalLanguage,
        programming_language: programmingLanguage,
    }
);

// send output to file
const stdout = fs.createWriteStream('./stdout.json');
process.stdout.write = stdout.write.bind(stdout);
// const stderr = fs.createWriteStream('./stderr.json');
// process.stderr.write = stderr.write.bind(stderr);

// evaluate tests and output result to stdout
judge.run(sourceFile);