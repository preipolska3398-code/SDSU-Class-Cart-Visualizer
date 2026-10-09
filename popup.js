document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("course-data");

    chrome.storage.local.get(["aztecScheduleSyncData"], (result) => {
        const data = result.aztecScheduleSyncData || {};
        container.innerHTML = `
            <p><strong>Course:</strong> ${data.courseName || "Not found"}</p>
            <p><strong>Instructor:</strong> ${data.instructor || "Not found"}</p>
            <p><strong>Schedule:</strong> ${data.schedule || "Not found"}</p>
            <p><strong>Seats:</strong> ${data.seats || "Not found"}</p>
            <p><strong>Location:</strong> ${data.location || "Not found"}</p>
        `;
    });
});
