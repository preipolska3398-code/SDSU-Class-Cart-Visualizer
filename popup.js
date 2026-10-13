document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("course-data");

    chrome.tabs.query(
        { active: true, currentWindow: true },
        (tabs) => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                { action: "requestData" },
                (response) => {
                    if (chrome.runtime.lastError) {
                        console.error(chrome.runtime.lastError);

                        container.textContent =
                            "Could not connect to SDSU page.";

                        return;
                    }

                    if (!response || !response.data) {
                        container.textContent =
                            "No class data received.";

                        return;
                    }

                    const classes = response.data;

                    if (classes.length === 0) {
                        container.textContent =
                            "No classes found in shopping cart.";

                        return;
                    }

                    container.innerHTML = "";

                    classes.forEach((course) => {
                        const courseDiv =
                            document.createElement("div");

                        courseDiv.className = "course";

                        const className =
                            document.createElement("p");

                        className.textContent =
                            "Class: " + course.className;

                        const professor =
                            document.createElement("p");

                        professor.textContent =
                            "Professor: " + course.professor;

                        courseDiv.appendChild(className);
                        courseDiv.appendChild(professor);

                        container.appendChild(courseDiv);
                    });
                }
            );
        }
    );
});