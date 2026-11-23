//message the popup shows when it can't read classes from the current tab
function getConnectionErrorMessage(tabUrl) {
    return "Could not connect to SDSU page.";
}

// Lets the Node tests load this file (Chrome ignores this line).
if (typeof module !== "undefined") {
    module.exports = { getConnectionErrorMessage };
}
