/*Note that this test only checks for formatting when content.js
receives a schedule with a newline charchter and checks if it preserves it.
This does not check for the final formatting done by the chrome extension pop-up
which is known for adjusting formatting on it's own. This has to be handled by 
the .css file. To show that there is still a bug a manual test is needed*/

const test = require("node:test");

// comparing expected and actual results
const assert = require("node:assert");

// Create a fake Chrome API to test some mock vals 
global.chrome = {
    runtime: {
        onMessage: {
            addListener() {}
        }
    }
};

// Create fake table headers 
const headers = [
    { textContent: "Course" },
    { textContent: "Day/Time" },
    { textContent: "Seats" },
    { textContent: "Room" }
];

// Create a fake table
const table = {
    querySelectorAll(selector) {
        // Return the fake headers when content.js searches for table headers
        return selector === "th" ? headers : [];
    }
};

// Create a fake shopping-cart row
const row = {
    cells: [
    
        { textContent: "CS 150" },

        // Hybrid schedule with two parts separated by a newline
        {
            textContent:
                "Monday Wednesday\n4:00PM to 5:15PM"
        },

        { textContent: "Open seats 43 of 80" },

        { textContent: "OP 201" }
    ],

    closest(selector) {
        // Return the fake table when content.js looks for the row's table
        return selector === "table" ? table : null;
    }
};

// Create a fake course element
const courseElement = {
    textContent: "CS 150",

    closest(selector) {
        // Return the fake row when content.js looks for the course's row
        return selector === "tr" ? row : null;
    }
};

// Create a fake browser document
global.document = {
    querySelectorAll() {
        // Return the fake course element when content.js searches for courses
        return [courseElement];
    },

    getElementById() {
        // Return the fake professor
        return {
            textContent: "M. Thapa"
        };
    }
};

// Import the real function from content.js to use for testing 
const {
    getShoppingCartClasses
} = require("../content.js");


test("keeps schedule day and time parts on separate lines", () => {
    // Run the real function using the fake data we creates 
    const classes = getShoppingCartClasses();

    // Get the schedule from the first returned class
    const schedule = classes[0].schedule;

    // Check that the schedule contains the expected line break
    assert.strictEqual(
        schedule,
        "Monday Wednesday\n4:00PM to 5:15PM"
    );

    // Confirm that the schedule includes a newline character
    assert.strictEqual(
        schedule.includes("\n"),
        true
    );
});