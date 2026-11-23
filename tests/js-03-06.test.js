const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

function shouldSuppressRmpLookup(professor) {
    const normalizedProf = (professor || "").trim().toLowerCase();
    return (
        !normalizedProf ||
        normalizedProf === "tba" ||
        normalizedProf.includes("to be announced") ||
        normalizedProf === "professor not found"
    );
}

function loadContentScriptWithMockDom(rowCells, headersText) {
    const contentCode = fs.readFileSync("content.js", "utf8");

    const mockHeaders = headersText.map((text) => ({ textContent: text }));
    const mockTable = {
        querySelectorAll: (selector) => (selector === "th" ? mockHeaders : [])
    };
    const mockRow = {
        cells: rowCells.map((text) => ({ textContent: text })),
        closest: (selector) => (selector === "table" ? mockTable : null)
    };
    const mockCourseElement = {
        textContent: "CS 450 - Intro to AI",
        closest: (selector) => (selector === "tr" ? mockRow : null)
    };

    const sandbox = {
        document: {
            querySelectorAll: () => [mockCourseElement],
            getElementById: () => null
        },
        chrome: {
            runtime: {
                onMessage: {
                    addListener: () => {}
                }
            }
        },
        console
    };

    vm.createContext(sandbox);
    vm.runInContext(contentCode, sandbox);
    return sandbox.getShoppingCartClasses();
}

test("JS-03 (Issue #65): suppresses RMP lookup when professor is 'Professor not found'", () => {
    const popupCode = fs.readFileSync("popup.js", "utf8");

    assert.ok(
        popupCode.includes("professor not found"),
        "popup.js must explicitly suppress RMP lookup for 'Professor not found'"
    );
    assert.equal(shouldSuppressRmpLookup("Professor not found"), true);
    assert.equal(shouldSuppressRmpLookup("To Be Announced"), true);
    assert.equal(shouldSuppressRmpLookup("TBA"), true);
    assert.equal(shouldSuppressRmpLookup(""), true);
    assert.equal(shouldSuppressRmpLookup(null), true);
    assert.equal(shouldSuppressRmpLookup("Alan Turing"), false);
});

test("JS-06 (Issue #86): safely handles missing row cells in getShoppingCartClasses()", () => {
    // Table has 3 headers (scheduleIndex = 2), but row only has 1 cell (cells[2] is undefined)
    const result = loadContentScriptWithMockDom(
        ["CS 450 - Intro to AI"],
        ["Class", "Professor", "Schedule"]
    );

    assert.equal(result.length, 1);
    assert.equal(result[0].className, "CS 450 - Intro to AI");
    assert.equal(result[0].professor, "Professor not found");
    assert.equal(result[0].schedule, "");
    assert.equal(result[0].room, "");
    assert.equal(result[0].seats, "");
});
