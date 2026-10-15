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
                        console.error(
                            chrome.runtime.lastError
                        );

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

                        if (course.schedule) {
                            const schedule = document.createElement("p");
                            schedule.textContent = "Schedule: " + course.schedule;
                            courseDiv.appendChild(schedule);
                        }

                        if (course.room) {
                            const room = document.createElement("p");
                            room.textContent = "Room: " + course.room;
                            courseDiv.appendChild(room);
                        }

                        if (course.seats) {
                            const seats = document.createElement("p");
                            seats.textContent = "Seats: " + course.seats;
                            courseDiv.appendChild(seats);
                        }

                        courseDiv.appendChild(professor);

                        container.appendChild(courseDiv);

                        // Do not show an RMP link
                        // if no professor is assigned.
                        if (
                            !course.professor ||
                            course.professor
                                .toLowerCase()
                                .includes("to be announced")
                        ) {
                            return;
                        }

                        const rmpStatus =
                            document.createElement("p");

                        rmpStatus.textContent =
                            "Finding Rate My Professor page...";

                        courseDiv.appendChild(rmpStatus);

                        chrome.runtime.sendMessage(
                            {
                                action:
                                    "findRateMyProfessor",
                                instructor:
                                    course.professor
                            },
                            (result) => {
                                if (
                                    chrome.runtime.lastError
                                ) {
                                    console.error(
                                        chrome.runtime.lastError
                                    );

                                    showSearchLink(
                                        courseDiv,
                                        rmpStatus,
                                        course.professor
                                    );

                                    return;
                                }

                                if (
                                    !result ||
                                    !result.url
                                ) {
                                    showSearchLink(
                                        courseDiv,
                                        rmpStatus,
                                        course.professor
                                    );

                                    return;
                                }

                                const link =
                                    document.createElement(
                                        "a"
                                    );

                                link.href = result.url;
                                link.target = "_blank";
                                link.rel =
                                    "noopener noreferrer";

                                if (
                                    result.url.includes(
                                        "/professor/"
                                    )
                                ) {
                                    // Direct profile found,
                                    // only show the link.
                                    rmpStatus.textContent =
                                        "";

                                    link.textContent =
                                        "Open Rate My Professor";
                                } else {
                                    // No direct profile found,
                                    // show message and search link.
                                    rmpStatus.textContent =
                                        "Professor profile not found.";

                                    link.textContent =
                                        "Search Rate My Professors";
                                }

                                courseDiv.appendChild(
                                    link
                                );
                            }
                        );
                    });
                }
            );
        }
    );
});


function showSearchLink(
    courseDiv,
    statusElement,
    professorName
) {
    const searchUrl =
        "https://www.ratemyprofessors.com/search/professors/877?q=" +
        encodeURIComponent(professorName);

    statusElement.textContent =
        "Professor profile not found.";

    const link =
        document.createElement("a");

    link.href = searchUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent =
        "Search Rate My Professors";

    courseDiv.appendChild(link);
}