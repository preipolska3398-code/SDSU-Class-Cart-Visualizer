const test = require("node:test");
const assert = require("node:assert");


// Testing for null/ missing values for the professor name
global.chrome = {
    runtime: {
        onMessage: {
            addListener() {}
        }
    }
};

const {
    cleanInstructorName
} = require("../background.js");

test("handles a missing professor name", () => {
    const result = cleanInstructorName(null);

    assert.strictEqual(result, "");
});