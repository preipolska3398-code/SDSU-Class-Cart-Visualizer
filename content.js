"use strict";

function getShoppingCartClasses() {
    const classes = []; // Create an array to store class information

    const courseElements = document.querySelectorAll(
        '[id^="DERIVED_SSR_FL_SSR_DESCR80$"]'
    ); // Select all course elements in the shopping cart

    courseElements.forEach((courseElement, index) => { // Iterate over each course element  
        const professorElement = document.getElementById(// Get the professor element corresponding to the current course element
            `DERIVED_REGFRM1_SSR_INSTR_LONG$${index}`// Construct the ID of the professor element based on the current course element index
        );

        classes.push({// Add the current course and professor information to the classes array
            className: courseElement.textContent.trim(),// Get the class name from the course element
            professor: professorElement 
                ? professorElement.textContent.trim()// Get the professor name if the element exists
                : "Professor not found"// Use a default value if the professor element is not found
        });
    });

    return classes; // Return the array of class information
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => { // Listen for messages from the extension background script
    if (request.action === "requestData") { // Check if the received message is requesting data
        const classes = getShoppingCartClasses(); // Get the shopping cart class information

        console.log("SHOPPING CART CLASSES:", classes);

        sendResponse({
            data: classes// Send the shopping cart class information back to the extension background script
        });
    }
});