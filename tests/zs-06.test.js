const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");

// Load the extension code without needing Chrome or a real RMP request.
function loadBackground(pages = []) {
    const requests = [];
    const background = vm.createContext({
        chrome: { runtime: { onMessage: { addListener() {} } } },
        console: { log() {}, error() {} },
        async fetch(url) {
            requests.push(url);
            const html = pages.shift();
            assert.equal(typeof html, "string", "Unexpected extra search");
            return { ok: true, async text() { return html; } };
        }
    });
    const code = fs.readFileSync(path.join(__dirname, "../background.js"), "utf8");
    vm.runInContext(code, background);
    return { background, requests };
}

// A small example of the data returned by RMP. This ID is only test data.
const professorPage = 'window.__RELAY_STORE__ = ' + JSON.stringify({
    teacher: {
        __typename: "Teacher",
        firstName: "Jorge",
        lastName: "Hernandez-Calderon",
        legacyId: 12345
    }
}) + '; window.process = {}';
const emptyPage = 'window.__RELAY_STORE__ = {}; window.process = {}';
const profileUrl = "https://www.ratemyprofessors.com/professor/12345";

test("ZS-06: full surnames and hyphenated surname parts match", () => {
    const { background } = loadBackground();
    assert.equal(background.namesMatch("Jorge Hernandez", "Jorge Hernandez"), true);
    assert.equal(background.namesMatch("Jorge Hernandez", "Jorge Hernandez-Calderon"), true);
    assert.equal(background.namesMatch("Jorge Calderon", "Jorge Hernandez-Calderon"), true);
});

test("ZS-06: wrong first names and incomplete surname parts do not match", () => {
    const { background } = loadBackground();
    assert.equal(background.namesMatch("J. Hernandez", "Adam Hernandez-Calderon"), false);
    assert.equal(background.namesMatch("Jorge Hern", "Jorge Hernandez-Calderon"), false);
});

test("ZS-06: retry by surname when the initial search misses the professor", async () => {
    const { background, requests } = loadBackground([emptyPage, professorPage]);
    const result = await background.findRateMyProfessor("J. Hernandez");
    assert.deepEqual(requests, [
        "https://www.ratemyprofessors.com/search/professors/877?q=J.%20Hernandez",
        "https://www.ratemyprofessors.com/search/professors/877?q=hernandez"
    ]);
    assert.equal(result.direct, true);
    assert.equal(result.url, profileUrl);
});

test("ZS-06: a successful first search needs only one request", async () => {
    const { background, requests } = loadBackground([professorPage]);
    const result = await background.findRateMyProfessor("J. Hernandez");
    assert.equal(requests.length, 1);
    assert.equal(result.direct, true);
    assert.equal(result.url, profileUrl);
});
