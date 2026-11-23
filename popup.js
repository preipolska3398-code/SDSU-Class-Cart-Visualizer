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

                        // Issue #69: tell logged-out users to log in
                        container.textContent =
                            getConnectionErrorMessage(tabs[0].url);

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
                            schedule.className = "schedule";
                            schedule.textContent = "Schedule: " + course.schedule;
                            courseDiv.appendChild(schedule);
                        }
                       
                        if (course.room) {
                            const room = document.createElement("p");
                            room.className = "room";
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
                        const normalizedProf = (course.professor || "")
                            .trim()
                            .toLowerCase();

                        if (
                            !normalizedProf ||
                            normalizedProf === "tba" ||
                            normalizedProf.includes("to be announced") ||
                            normalizedProf === "professor not found"
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

                                if (
                                    Array.isArray(result.matches) &&
                                    result.matches.length > 1
                                ) {
                                    rmpStatus.textContent =
                                        `Found ${result.matches.length} possible matches on RMP. Choose your professor:`;

                                    const matchesList = document.createElement("ul");
                                    matchesList.className = "professor-matches";

                                    result.matches.forEach((match) => {
                                        const item = document.createElement("li");
                                        const profileLink = document.createElement("a");
                                        profileLink.textContent = match.name;
                                        profileLink.href = match.url;
                                        profileLink.target = "_blank";
                                        profileLink.rel = "noopener noreferrer";
                                        item.appendChild(profileLink);
                                        matchesList.appendChild(item);
                                    });

                                    courseDiv.appendChild(matchesList);
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
