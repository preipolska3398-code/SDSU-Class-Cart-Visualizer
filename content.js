"use strict";

function getShoppingCartClasses() {
    const classes = [];

    const courseElements = document.querySelectorAll(
        '[id^="DERIVED_SSR_FL_SSR_DESCR80$"]'
    );

    courseElements.forEach((courseElement, index) => {
        const professorElement = document.getElementById(
            `DERIVED_REGFRM1_SSR_INSTR_LONG$${index}`
        );
        const row = courseElement.closest("tr");
        const headers = Array.from(
            row?.closest("table")?.querySelectorAll("th") || []
        );
        const roomIndex = headers.findIndex((header) =>
            /room|location/i.test(header.textContent)
        );
        const scheduleIndex = headers.findIndex((header) =>
            /day|time|schedule/i.test(header.textContent)
        );
        const seatsIndex = headers.findIndex((header) =>
            /seat|enrollment|capacity/i.test(header.textContent)
        );

        let scheduleText = "";
        if (scheduleIndex >= 0) {
            scheduleText = (row?.cells?.[scheduleIndex]?.textContent || "").trim();

            scheduleText = scheduleText.replace(
                /\s*(?=\b\d{1,2}:\d{2}\s*(?:AM|PM)\b)/i,
                "\n"
            );

            scheduleText = scheduleText.replace(
                /(\b\d{1,2}:\d{2}\s*(?:AM|PM)\s*(?:to|-|–)\s*\d{1,2}:\d{2}\s*(?:AM|PM))\s*(?=\S)/i,
                "$1\n"
            );
        }

        let roomText = "";
        if (roomIndex >= 0) {
            roomText = (row?.cells?.[roomIndex]?.textContent || "").trim();

            roomText = roomText.replace(
                /(\d+)\s*(?=[A-Za-z])/,
                "$1\n"
            );
        }

        classes.push({
            className: courseElement.textContent.trim(),
            professor: professorElement
                ? professorElement.textContent.trim()
                : "Professor not found",
            schedule: scheduleText,
            seats: seatsIndex >= 0
                ? (row?.cells?.[seatsIndex]?.textContent || "").trim()
                : "",
            room: roomText
        });
    });

    return classes;
}

if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener(
        (request, sender, sendResponse) => {
            if (request.action === "requestData") {
                const classes = getShoppingCartClasses();
                console.log("SHOPPING CART CLASSES:", classes);
                sendResponse({ data: classes });
            }
        }
    );
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { getShoppingCartClasses };
}
