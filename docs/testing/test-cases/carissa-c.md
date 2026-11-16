# Test Cases: Carissa C

**Team number:** 14
**My area:** Session and permissions

<!-- None of the Part 6 tests (TC-1 to TC-3) are in my area, so all tests below are New. Environment for every test: Chrome on Windows, extension loaded unpacked from main at commit c205220. -->

---

**Test ID:** CC-01
**From Part 6:** New
**Written by:** Carissa Chen
**Title:** Logged-in student sees cart classes with Rate My Professors links
**Traces to:** G-CC-01
**Test type:** Acceptance
**Preconditions:** Extension loaded from main (c205220). Logged into SDSU. At least 1 class in shopping cart that has an assigned professor
**Test data:** My current SDSU shopping cart with 2 classes (CS 420 and PHIL 339)

**Steps:**
1. Open my SDSU shopping cart page on cmsweb.cms.sdsu.edu
2. Count the classes listed on the cart page
3. Click the Aztec Schedule Sync icon in the Chrome toolbar and wait 10 seconds
4. Click the Rate My Professors link under the first class

**Expected result:** The popup lists the same number of classes as the cart page, each with "Class:" and "Professor:". Every class with an assigned professor shows either "Open Rate My Professor" or "Search Rate My Professors". Clicking the link opens a ratemyprofessors.com page in a new tab
**Actual result:** The popup listed both classes (2 of 2) with "Class:" and "Professor:". Both showed "Open Rate My Professor". Clicking both the CS 420 and PHIL 339 link opened the correct Rate My Professors page in a new tab
**Status:** Pass
**Severity:** N/A
**V or V:** N/A
**GitHub Issue:** N/A

---

**Test ID:** CC-02
**From Part 6:** New
**Written by:** Carissa Chen
**Title:** Popup on a non SDSU tab shows connection message
**Traces to:** REQ-CC-01
**Test type:** Negative
**Preconditions:** Extension loaded from main (c205220)
**Test data:** Tab URL: https://www.google.com

**Steps:**
1. Open https://www.google.com in a Chrome tab
2. Click the Aztec Schedule Sync icon and wait 10 seconds
3. Read the popup text

**Expected result:** The popup shows "Could not connect to SDSU page." and no class list or Rate My Professors link
**Actual result:** On https://www.google.com, the popup showed exactly "Could not connect to SDSU page." No class list or Rate My Professors link appeared
**Status:** Pass
**Severity:** N/A
**V or V:** N/A
**GitHub Issue:** N/A

---

**Test ID:** CC-03
**From Part 6:** New
**Written by:** Carissa Chen
**Title:** Popup tells a logged out user to log in to SDSU
**Traces to:** REQ-CC-02
**Test type:** Negative
**Preconditions:** Extension loaded from main (c205220)
**Test data:** Uses my own SDSU account

**Steps:**
1. On the SDSU site, sign out
2. Go to https://cmsweb.cms.sdsu.edu/ (or wherever the sign out page leaves me). Write down the URL
3. Click the Aztec Schedule Sync icon and wait 10 seconds

**Expected result:** The popup shows a message telling me to log in to SDSU. It does not show "No classes found in shopping cart."
**Actual result:** After signing out, https://cmsweb.cms.sdsu.edu/ redirected to https://my.sdsu.edu/ (the my.SDSU login page). The popup showed "Could not connect to SDSU page." It didn't tell the user to log in to SDSU.
**Status:** Fail
**Severity:** Minor
**V or V:** Verification
**GitHub Issue:**

---

**Test ID:** CC-04
**From Part 6:** New
**Written by:** Carissa Chen
**Title:** Popup reads classes from the SDSU Class Search results page
**Traces to:** REQ-CC-03
**Test type:** System
**Preconditions:** Extension loaded from main (c205220). Logged into SDSU
**Test data:** Class Search for subject CS, current term

**Steps:**
1. In SDSU, open Class Search and search for subject CS in the current term (Fall 2026)
2. Confirm the results page lists at least 1 class with an instructor
3. Click the Aztec Schedule Sync icon and wait 10 seconds

**Expected result:** The popup lists at least 1 class from the search results, with its professor name
**Actual result:** With CS search results showing on the Class Search page, the popup showed "No classes found in shopping cart." No classes or professor names were listed
**Status:** Fail
**Severity:** Major
**V or V:** Validation
**GitHub Issue:**

---

**Test ID:** CC-05
**From Part 6:** New
**Written by:** Carissa Chen
**Title:** Every permission in manifest.json is used in the code
**Traces to:** NFR-CC-01
**Test type:** Security
**Preconditions:** Code on main at commit c205220
**Test data:** Permissions in manifest.json: storage, tabs, activeTab. Search terms: "chrome.storage" for storage, "chrome.tabs" for tabs

**Steps:**
1. Open manifest.json on GitHub and list every entry under "permissions"
2. On the repo page, press "/" and search the repo code for "chrome.storage"
3. Search the repo code for "chrome.tabs"
4. Write down the number of matches for each

**Expected result:** Each permission has at least 1 match in the extension's.js files (background.js, content.js, popup.js)
**Actual result:** "storage" is listed in manifest.json but has 0 matches for chrome.storage in background.js, content.js, and popup.js. "tabs" has 2 matches in popup.js (chrome.tabs.query and chrome.tabs.sendMessage). The extension requests a permission it never uses
**Status:** Fail
**Severity:** Minor
**V or V:** Verification
**GitHub Issue:**

---
