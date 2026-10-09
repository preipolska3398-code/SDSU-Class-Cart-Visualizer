chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "courseData") {
        chrome.storage.local.set({ aztecScheduleSyncData: message.data }, () => {
            sendResponse({ status: "saved" });
        });
        return true;
    }

    return false;
});
