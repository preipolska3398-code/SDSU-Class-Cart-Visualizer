# Test Cases: Julian S

**Team number:** 14
**My area:** Input

---

**Test ID:** JS-01
**From Part 6:** TC-1
**Written by:** Julian Saquic
**Title:** Normalize instructor name from "Last, First" to "First Last"
**Traces to:** REQ-JS-01
**Test type:** Unit
**Preconditions:** `background.js` loaded in Node.js test environment or browser service worker console.
**Test data:** `instructor = "Turing, Alan"`

**Steps:**
1. Open the extension service worker DevTools console (or import `cleanInstructorName` from `background.js`).
2. Call `cleanInstructorName("Turing, Alan")`.
3. Inspect the returned string value.

**Expected result:** Returns `"Alan Turing"`.
**Actual result:** Returned `"Alan Turing"`.
**Status:** Pass
**Severity:**
**V or V:**
**GitHub Issue:**

---

**Test ID:** JS-02
**From Part 6:** New
**Written by:** Julian Saquic
**Title:** Handle missing instructor element and missing optional table columns in shopping cart DOM
**Traces to:** REQ-JS-03
**Test type:** Boundary Value
**Preconditions:** A simulated or live SDSU shopping cart table containing 1 course row (`id="DERIVED_SSR_FL_SSR_DESCR80$0"`) with no corresponding `DERIVED_REGFRM1_SSR_INSTR_LONG$0` element and no `<th>` columns matching schedule, room, or seats.
**Test data:** Row with course title `"CS 450 - Intro to AI"`, missing instructor span, and single-column table header `<th>Class</th>`.

**Steps:**
1. Render the minimal 1-row shopping cart table in the page DOM.
2. Invoke `getShoppingCartClasses()` in `content.js`.
3. Inspect the returned array and object properties.

**Expected result:** Returns `[{ className: "CS 450 - Intro to AI", professor: "Professor not found", schedule: "", room: "", seats: "" }]` without throwing a TypeError.
**Actual result:** Returned `[{ className: "CS 450 - Intro to AI", professor: "Professor not found", schedule: "", room: "", seats: "" }]` with no errors thrown.
**Status:** Pass
**Severity:**
**V or V:**
**GitHub Issue:**

---

**Test ID:** JS-03
**From Part 6:** New
**Written by:** Julian Saquic
**Title:** Suppress Rate My Professors lookup when instructor element is missing ("Professor not found")
**Traces to:** REQ-JS-04
**Test type:** Negative
**Preconditions:** Extension loaded unpacked in Chrome; shopping cart row has no instructor element so `content.js` returns `professor: "Professor not found"`.
**Test data:** Course object `{ className: "CS 450", professor: "Professor not found", schedule: "MW 2:00PM", room: "GMCS 333", seats: "5" }`.

**Steps:**
1. Open an SDSU shopping cart page where a course row lacks `DERIVED_REGFRM1_SSR_INSTR_LONG$0`.
2. Click the Aztec Schedule Sync extension icon to open `popup.html`.
3. Observe the rendered course card and network/service-worker requests for `findRateMyProfessor`.

**Expected result:** The popup displays `"Professor: Professor not found"` and suppresses the Rate My Professors lookup (no `"Search Rate My Professors"` link or `findRateMyProfessor` message sent).
**Actual result:** The popup displays `"Professor: Professor not found"` and still triggers `findRateMyProfessor`, rendering `"Professor profile not found."` with a `"Search Rate My Professors"` link querying `?q=Professor%20not%20found`.
**Status:** Fail
**Severity:** Minor
**V or V:** Verification
**GitHub Issue:** #1

---

**Test ID:** JS-04
**From Part 6:** New
**Written by:** Julian Saquic
**Title:** Extract reordered shopping cart table columns dynamically by header text
**Traces to:** NFR-JS-01
**Test type:** Integration
**Preconditions:** SDSU shopping cart table DOM where column order is reversed (`Seats`, `Room`, `Schedule`, `Class`) compared to standard layout.
**Test data:** Table headers `<th>Seats</th><th>Room</th><th>Day/Time</th><th>Class</th>` with row values `"12"`, `"EBA 341"`, `"TuTh 11:00AM"`, and `"STAT 250"` (`id="DERIVED_SSR_FL_SSR_DESCR80$0"`).

**Steps:**
1. Load the reordered shopping cart table into the active tab DOM.
2. Send `{ action: "requestData" }` via `chrome.tabs.sendMessage` from `popup.js` to `content.js`.
3. Inspect the `response.data[0]` object received by `popup.js`.

**Expected result:** `response.data[0]` maps `seats: "12"`, `room: "EBA 341"`, `schedule: "TuTh 11:00AM"`, and `className: "STAT 250"` accurately despite column reordering.
**Actual result:** `response.data[0]` mapped `seats: "12"`, `room: "EBA 341"`, `schedule: "TuTh 11:00AM"`, and `className: "STAT 250"` accurately.
**Status:** Pass
**Severity:**
**V or V:**
**GitHub Issue:**

---

**Test ID:** JS-05
**From Part 6:** New
**Written by:** Julian Saquic
**Title:** End-to-end capture and display of shopping cart classes and normalized professor names
**Traces to:** G-JS-01
**Test type:** Acceptance
**Preconditions:** Aztec Schedule Sync extension loaded in Chrome (`chrome://extensions` Developer Mode); student is logged into `https://cmsweb.cms.sdsu.edu/` with at least 2 classes in their shopping cart (including an instructor listed as `"Last, First"`).
**Test data:** Live SDSU Shopping Cart containing `"CS 450"` with instructor `"Yu, Xin"` and `"STAT 250"` with instructor `"Duncan, K"`.

**Steps:**
1. Navigate to the SDSU Class Shopping Cart page on `https://cmsweb.cms.sdsu.edu/`.
2. Click the Aztec Schedule Sync extension icon in the Chrome toolbar.
3. Verify that all carted classes, schedules, rooms, seats, and normalized instructor names appear automatically in the popup without manual entry.

**Expected result:** Popup automatically displays all carted classes with their schedule, room, seats, and normalized `"First Last"` instructor names/links.
**Actual result:** Popup displayed `"CS 450"` and `"STAT 250"` with their schedules, rooms, seats, and normalized instructor lookups automatically upon clicking the extension icon.
**Status:** Pass
**Severity:**
**V or V:**
**GitHub Issue:**

---
