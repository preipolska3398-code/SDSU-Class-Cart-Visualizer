//issue #69 (from CC-03 / REQ-CC-02): a logged-out user should be told to log in
const test = require("node:test");
const assert = require("node:assert");
const { getConnectionErrorMessage } = require("../popupMessages.js");

test("#69: logged-out user on the my.SDSU login page is told to log in", () => {
    assert.equal(
        getConnectionErrorMessage("https://my.sdsu.edu/?SAMLRequest=abc"),
        "Please log in to my.SDSU, then open your shopping cart."
    );
});

test("#69: non-SDSU tab still shows the connection message (REQ-CC-01)", () => {
    assert.equal(
        getConnectionErrorMessage("https://www.google.com/"),
        "Could not connect to SDSU page."
    );
});

test("#69: missing tab URL still shows the connection message", () => {
    assert.equal(
        getConnectionErrorMessage(undefined),
        "Could not connect to SDSU page."
    );
});
