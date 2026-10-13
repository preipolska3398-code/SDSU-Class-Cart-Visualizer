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

        classes.push({
            className: courseElement.textContent.trim(),
            professor: professorElement
                ? professorElement.textContent.trim()
                : "Professor not found"
        });
    });

    return classes;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "requestData") {
        const classes = getShoppingCartClasses();

        console.log("SHOPPING CART CLASSES:", classes);

        sendResponse({
            data: classes
        });
    }
});