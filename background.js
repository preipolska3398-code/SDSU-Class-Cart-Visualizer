const RMP_SCHOOL_ID = "877";
const RMP_ORIGIN = "https://www.ratemyprofessors.com";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "findRateMyProfessor") {
        findRateMyProfessor(message.instructor)
            .then(sendResponse)
            .catch((error) => {
                console.error("RMP lookup failed:", error);

                sendResponse({
                    ok: false,
                    direct: false,
                    error: error.message,
                    url: buildSearchUrl(message.instructor)
                });
            });

        return true;
    }

    return false;
});


async function findRateMyProfessor(instructor) {
    const cleanName = cleanInstructorName(instructor);

    if (!cleanName) {
        throw new Error("No instructor name provided.");
    }

    const searchUrl = buildSearchUrl(cleanName);

    const response = await fetch(searchUrl, {
        method: "GET",
        credentials: "omit"
    });

    if (!response.ok) {
        throw new Error(
            `Rate My Professors returned HTTP ${response.status}`
        );
    }

    const html = await response.text();

    const professorUrl =
        findMatchingProfessor(html, cleanName);

    // professor page found
    if (professorUrl) {
        return {
            ok: true,
            direct: true,
            instructor: cleanName,
            url: professorUrl
        };
    }

    // No match found, so use the search page instead
    return {
        ok: true,
        direct: false,
        instructor: cleanName,
        url: searchUrl
    };
}


function buildSearchUrl(instructor) {
    return (
        `${RMP_ORIGIN}/search/professors/${RMP_SCHOOL_ID}` +
        `?q=${encodeURIComponent(instructor)}`
    );
}


function cleanInstructorName(name) {
    let cleaned = String(name || "")
        .replace(/\s+/g, " ")
        .trim();

    // Converts to correct format
    const parts = cleaned
        .split(",")
        .map(part => part.trim())
        .filter(Boolean);

    if (parts.length === 2) {
        cleaned = `${parts[1]} ${parts[0]}`;
    }

    return cleaned;
}


function findMatchingProfessor(html, sdsuProfessorName) {
    const startMarker = "window.__RELAY_STORE__ = ";
    const endMarker = "window.process = {}";

    const startIndex = html.indexOf(startMarker);
    const endIndex = html.indexOf(endMarker);

    // checks if the RMP data exists
    if (
        startIndex === -1 ||
        endIndex === -1 ||
        endIndex <= startIndex
    ) {
        console.log("Could not find RMP relay data.");
        return null;
    }

    // Pull out just the JSON stored in __RELAY_STORE__

    let jsonText = html.substring(
        startIndex + startMarker.length,
        endIndex
    );

    // Remove whitespace and the semicolon after the JSON

    jsonText = jsonText.trim();

    if (jsonText.endsWith(";")) {
        jsonText = jsonText.slice(0, -1);
    }

    let relayData;

    try {
        relayData = JSON.parse(jsonText);
    } catch (error) {
        console.error(
            "Could not parse RMP relay data:",
            error
        );

        return null;
    }

    const candidates = [];

    
    // Look through the RMP data for actual Teacher objects
    
    for (const key in relayData) {
        const item = relayData[key];

        if (
            item &&
            item.__typename === "Teacher" &&
            item.firstName &&
            item.lastName &&
            item.legacyId
        ) {
            candidates.push({
                firstName: item.firstName,
                lastName: item.lastName,
                id: item.legacyId,
                url:
                    "https://www.ratemyprofessors.com/professor/" +
                    item.legacyId
            });
        }
    }

    console.log(
        "SDSU professor:",
        sdsuProfessorName
    );

    console.log(
        "RMP professor candidates:",
        candidates
    );

    /*
        Compare the SDSU professor with each RMP professor.
    */
    for (const candidate of candidates) {
        const rmpName =
            candidate.firstName +
            " " +
            candidate.lastName;

        console.log(
            "Comparing:",
            sdsuProfessorName,
            "with",
            rmpName
        );

        if (
            namesMatch(
                sdsuProfessorName,
                rmpName
            )
        ) {
            console.log(
                "MATCH FOUND:",
                candidate
            );

            return candidate.url;
        }
    }

    console.log(
        "No professor name matched."
    );

    return null;
}


function namesMatch(sdsuName, rmpName) {
    const sdsu = parseProfessorName(sdsuName);
    const rmp = parseProfessorName(rmpName);

    // Last names must match.
    if (
        !sdsu.lastName ||
        !rmp.lastName ||
        sdsu.lastName !== rmp.lastName
    ) {
        return false;
    }

    // Both sites give full first names.
    if (
        sdsu.firstName.length > 1 &&
        rmp.firstName.length > 1
    ) {
        return sdsu.firstName === rmp.firstName;
    }

    // If either site gives only an initial,
    // compare first initials.
    if (
        sdsu.firstInitial &&
        rmp.firstInitial &&
        sdsu.firstInitial === rmp.firstInitial
    ) {
        return true;
    }

    return false;
}


function parseProfessorName(name) {
    const cleaned = String(name || "")
        .replace(/\./g, "")
        .replace(/[^a-zA-Z0-9\s'-]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();

    const parts = cleaned
        .split(" ")
        .filter(Boolean);

    if (parts.length === 0) {
        return {
            firstName: "",
            firstInitial: "",
            lastName: ""
        };
    }

    if (parts.length === 1) {
        return {
            firstName: "",
            firstInitial: "",
            lastName: parts[0]
        };
    }

    const firstName = parts[0];
    const lastName = parts[parts.length - 1];

    return {
        firstName: firstName,
        firstInitial: firstName.charAt(0),
        lastName: lastName
    };
}

function extractText(html) {
    return String(html || "")
        .replace(
            /<script\b[^>]*>[\s\S]*?<\/script>/gi,
            " "
        )
        .replace(
            /<style\b[^>]*>[\s\S]*?<\/style>/gi,
            " "
        )
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/gi, " ")
        .replace(/&amp;/gi, "&")
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .replace(/\s+/g, " ")
        .trim();
}