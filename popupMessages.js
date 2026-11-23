//message the popup shows when it cannot read classes from the current tab
//issue #69: a logged-out user lands on an SDSU login page (like my.sdsu.edu),
//so tell them to log in instead of a generic connection error
function getConnectionErrorMessage(tabUrl) {
    let host = "";

    try {
        host = new URL(tabUrl).hostname;
    } catch (error) {
        host = "";
    }

    const isSdsuSite = host === "sdsu.edu" || host.endsWith(".sdsu.edu");

    if (isSdsuSite && host !== "cmsweb.cms.sdsu.edu") {
        return "Please log in to my.SDSU, then open your shopping cart.";
    }

    return "Could not connect to SDSU page.";
}

//lets the Node tests load this file (Chrome ignores this line)
if (typeof module !== "undefined") {
    module.exports = { getConnectionErrorMessage };
}
