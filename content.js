"use strict";

function getShoppingCartClasses() {
    const classes = []; // Create an array to store class information

    const courseElements = document.querySelectorAll(
        '[id^="DERIVED_SSR_FL_SSR_DESCR80$"]'
    ); // Select all course elements in the shopping cart

    courseElements.forEach((courseElement, index) => {
        // Get the professor element corresponding to the current course
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
            scheduleText = row.cells[scheduleIndex]
                .textContent
                .trim();


            // Add a new line before the first time
            scheduleText = scheduleText.replace(
                /\s*(?=\b\d{1,2}:\d{2}\s*(?:AM|PM)\b)/i,
                "\n"
            );


                    // Add a new line after the complete time range
            scheduleText = scheduleText.replace(
                /(\b\d{1,2}:\d{2}\s*(?:AM|PM)\s*(?:to|-|–)\s*\d{1,2}:\d{2}\s*(?:AM|PM))\s*(?=\S)/i,
                "$1\n"
            );
        }

       
        let roomText = "";

        if (roomIndex >= 0) {
            roomText = row.cells[roomIndex].textContent.trim();

            // Add a line break between the room number and the next location
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

            /*schedule: scheduleIndex >= 0
                ? row.cells[scheduleIndex].textContent.trim()
                : "",
            */
            schedule: scheduleText,
            seats: seatsIndex >= 0
                ? row.cells[seatsIndex].textContent.trim()
                : "",

           // room: roomIndex >= 0
              //  ? row.cells[roomIndex].textContent.trim()
               // : ""
            room: roomText
        });
    });

    return classes;
}

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (request.action === "requestData") {
            const classes = getShoppingCartClasses();

            console.log(
                "SHOPPING CART CLASSES:",
                classes
            );

            sendResponse({
                data: classes
            });
        }
    }
);
// Export the function so Node.js can test it
if (typeof module !== "undefined") {
    module.exports = { getShoppingCartClasses };
}