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

        classes.push({
            className: courseElement.textContent.trim(),

            professor: professorElement
                ? professorElement.textContent.trim()
                : "Professor not found",

            schedule: scheduleIndex >= 0
                ? row.cells[scheduleIndex].textContent.trim()
                : "",

            seats: seatsIndex >= 0
                ? row.cells[seatsIndex].textContent.trim()
                : "",

            room: roomIndex >= 0
                ? row.cells[roomIndex].textContent.trim()
                : ""
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
