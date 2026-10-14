document.addEventListener("DOMContentLoaded", () => { // Wait for the DOM to be fully loaded before executing the script
    const container = document.getElementById("course-data"); // Get the container element to display course data

    chrome.tabs.query(
        { active: true, currentWindow: true },// Query the active tab in the current window
        (tabs) => {
            chrome.tabs.sendMessage(// Send a message to the content script in the active tab
                tabs[0].id,
                { action: "requestData" },// Request data from the content script
                (response) => {
                    if (chrome.runtime.lastError) {// Check if there was an error while sending the message
                        console.error(chrome.runtime.lastError);

                        container.textContent =
                            "Could not connect to SDSU page.";// Display an error message if the connection fails

                        return;
                    }

                    if (!response || !response.data) {// Check if the response contains valid data
                        container.textContent =
                            "No class data received.";// Display a message if no data is received

                        return;
                    }

                    const classes = response.data;

                    if (classes.length === 0) {// Check if there are any classes in the shopping cart
                        container.textContent =
                            "No classes found in shopping cart.";// Display a message if no classes are found

                        return;
                    }

                    container.innerHTML = "";// Clear the container before displaying new course data

                    classes.forEach((course) => {// Iterate over each class in the shopping cart
                        const courseDiv =
                            document.createElement("div"); // Create a new div element for the course

                        courseDiv.className = "course"; // Set the class name for the course div

                        const className =
                            document.createElement("p"); // Create a paragraph element for the class name

                        className.textContent =
                            "Class: " + course.className; // Set the text content for the class name paragraph

                        const professor =
                            document.createElement("p"); // Create a paragraph element for the professor name

                        professor.textContent =
                            "Professor: " + course.professor; // Set the text content for the professor name paragraph

                        courseDiv.appendChild(className); // Append the class name paragraph to the course div
                        courseDiv.appendChild(professor); // Append the professor name paragraph to the course div

                        container.appendChild(courseDiv); // Append the course div to the container
                    });
                }
            );
        }
    );
});
