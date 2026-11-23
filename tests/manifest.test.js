//issue #67 (from CC-05 / NFR-CC-01): every permission in manifest.json
//must be used by the extension's code.
const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");

const manifest = JSON.parse(fs.readFileSync("manifest.json", "utf8"));
const code = ["background.js", "content.js", "popup.js"]
    .map((file) => fs.readFileSync(file, "utf8"))
    .join("\n");

//permissions that have their own chrome.* API, and the text that shows the code uses it
const apiFor = {
    storage: "chrome.storage",
    tabs: "chrome.tabs"
};

for (const permission of manifest.permissions) {
    if (!apiFor[permission]) continue;

    test(`#67: "${permission}" permission is used in the code`, () => {
        assert.ok(
            code.includes(apiFor[permission]),
            `manifest.json asks for "${permission}" but no file uses ${apiFor[permission]}`
        );
    });
}
