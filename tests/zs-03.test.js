const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

// Simulate RMP data so these tests do not depend on its live search results.
function loadBackground(teachers) {
    const data = {};
    teachers.forEach((teacher, index) => {
        data[index] = { __typename: "Teacher", ...teacher };
    });
    const html = `window.__RELAY_STORE__ = ${JSON.stringify(data)}; window.process = {}`;
    const requests = [];
    const background = vm.createContext({
        chrome: { runtime: { onMessage: { addListener() {} } } },
        console: { log() {}, error() {} },
        async fetch(url) {
            requests.push(url);
            return { ok: true, async text() { return html; } };
        }
    });
    const code = fs.readFileSync(path.join(__dirname, "../background.js"), "utf8");
    vm.runInContext(code, background);
    return { background, requests };
}

// Example profiles with made-up IDs.
const ajani = { firstName: "Ajani", lastName: "Brown", legacyId: 101 };
const allison = { firstName: "Allison", lastName: "Brown", legacyId: 102 };
const timothy = { firstName: "Timothy", lastName: "Brown", legacyId: 103 };

test("ZS-03: two matching professors return both names and profile links", async () => {
    const { background, requests } = loadBackground([ajani, allison, timothy]);
    const result = await background.findRateMyProfessor("A. Brown");
    assert.equal(requests[0], "https://www.ratemyprofessors.com/search/professors/877?q=brown");
    assert.equal(result.direct, false);
    assert.equal(result.matches.length, 2);
    assert.equal(result.matches[0].name, "Ajani Brown");
    assert.equal(result.matches[0].url, "https://www.ratemyprofessors.com/professor/101");
    assert.equal(result.matches[1].name, "Allison Brown");
    assert.equal(result.matches[1].url, "https://www.ratemyprofessors.com/professor/102");
});

test("ZS-03: one matching professor still returns a direct link", async () => {
    const { background } = loadBackground([ajani, timothy]);
    const result = await background.findRateMyProfessor("A. Brown");
    assert.equal(result.direct, true);
    assert.equal(result.url, "https://www.ratemyprofessors.com/professor/101");
});

test("ZS-03: no matching professors returns the search link", async () => {
    const { background } = loadBackground([timothy]);
    const result = await background.findRateMyProfessor("A. Brown");
    assert.equal(result.direct, false);
    assert.equal(result.matches.length, 0);
    assert.equal(result.url, "https://www.ratemyprofessors.com/search/professors/877?q=A.%20Brown");
});

test("ZS-03: duplicate records do not count as different professors", async () => {
    const { background } = loadBackground([ajani, ajani]);
    const result = await background.findRateMyProfessor("A. Brown");
    assert.equal(result.direct, true);
    assert.equal(result.url, "https://www.ratemyprofessors.com/professor/101");
});
