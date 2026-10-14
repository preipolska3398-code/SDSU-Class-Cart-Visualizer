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

        classes.push({
            className: courseElement.textContent.trim(),

            professor: professorElement
                ? professorElement.textContent.trim()
                : "Professor not found"
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