/*Note that this test only checks for formatting when content.js
receives a location with a newline charchter and checks if it preserves it.
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
    
        { textContent: "CS 150L" },

        {
            textContent:
                "Tuesday\n9:30AM to 10:45AM"
        },

        { textContent: "Closed" },

        { textContent: "HH 128\nONLINE" }
    ],

    closest(selector) {
        // Return the fake table when content.js looks for the row's table
        return selector === "table" ? table : null;
    }
};

// Create a fake course element
const courseElement = {
    textContent: "CS 150L",

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


test("keeps two locations for hybrid classes on separate lines", () => {
    // Run the real function using the fake webpage data
    const classes = getShoppingCartClasses();

    // Get the room/location information from the first class
    const room = classes[0].room;

    // Check that both locations are preserved on separate lines
    assert.strictEqual(
        room,
        "HH 128\nONLINE"
    );

    // Confirm that the room value contains a newline
    assert.strictEqual(
        room.includes("\n"),
        true
    );
});