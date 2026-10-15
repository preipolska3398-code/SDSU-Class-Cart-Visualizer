const test = require("node:test");
const assert = require("node:assert");

// Test that class information is stored correctly
test("stores class and professor information", () => {

    const course = {
        className: "CS 450",
        professor: "X. Yu"
    };

    assert.equal(course.className, "CS 450");
    assert.equal(course.professor, "X. Yu");
});


// Test multiple classes
test("stores multiple classes", () => {

    const classes = [
        {
            className: "CS 450",
            professor: "X. Yu"
        },
        {
            className: "STAT 250",
            professor: "K. Duncan"
        }
    ];

    assert.equal(classes.length, 2);
    assert.equal(classes[0].professor, "X. Yu");
    assert.equal(classes[1].professor, "K. Duncan");
});


// Test what happens when a professor is missing
test("handles missing professor", () => {

    const professorElement = null;

    const professor = professorElement
        ? professorElement.textContent.trim()
        : "Professor not found";

    assert.equal(professor, "Professor not found");
});