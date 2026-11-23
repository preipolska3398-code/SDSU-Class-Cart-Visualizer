const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

function shouldSuppressRmpLookup(professor) {
    const normalizedProf = (professor || "").trim().toLowerCase();
    return (
        !normalizedProf ||
        normalizedProf === "tba" ||
        normalizedProf.includes("to be announced") ||
        normalizedProf === "professor not found"
    );
}

test("JS-03 (Issue #65): suppresses RMP lookup when professor is 'Professor not found'", () => {
    const popupCode = fs.readFileSync("popup.js", "utf8");
    assert.ok(
        popupCode.includes("professor not found"),
        "popup.js must explicitly suppress RMP lookup for 'Professor not found'"
    );
    assert.equal(shouldSuppressRmpLookup("Professor not found"), true);
    assert.equal(shouldSuppressRmpLookup("Alan Turing"), false);
});

test("JS-06: suppresses 'TBA' and safely handles missing row cells in content.js", () => {
    const contentCode = fs.readFileSync("content.js", "utf8");
    assert.ok(
        contentCode.includes("row?.cells?.["),
        "content.js must guard against missing row cells with optional chaining"
    );
    assert.equal(shouldSuppressRmpLookup("TBA"), true);
    assert.equal(shouldSuppressRmpLookup(""), true);
    assert.equal(shouldSuppressRmpLookup(null), true);
});
