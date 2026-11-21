# Test Cases: [Your Mehla A]

**Team number:** [14]
**My area:** [Viewing List/ Dashboard ]

<!--
HOW TO USE THIS FILE
1. Copy this file. Name the copy with your first name and last initial, like  maria-g.md
2. Leave TEMPLATE.md untouched for your teammates.
3. If a Part 6 test belongs to your area, upgrade it first and put it in the first block.
   Write at least 4 test cases using at least 3 test types. Include 1 Acceptance test that traces to your Stakeholder Goal.
   Run every test on the inherited system. Every Fail gets a GitHub Issue.
4. Copy the block between the lines for each new test case.
5. Test IDs: use your initials plus a number, like  MG-01, MG-02. This keeps IDs unique across your team.
   "Traces to" must name one of YOUR requirement IDs, like REQ-MG-02.
6. See docs/TESTING_FIELD_GUIDE.md for the sample test case TC-00.
-->

---

**Test ID:** MA-01
**From Part 6:** New
**Written by:** Mehla A
**Title:** Verify the extension's ability to display a pop-up summary of the classes in a user's shopping cart with a RateMyProfessor link for the given instructor. 
**Traces to:** G-MA-01
**Test type:** Acceptance  
**Preconditions:**
- The Chrome extension has been added to the device.
- The my.sdsu.edu and RateMyProfessor website is running.
- Available SDSU classes have been added to the shopping cart. 

**Test data:** (Fall Semester)
Class: CS 150 Intro to Computer programming.
Professor: P.Kraft
Schedule: Mon Wed | 4:00pm-5:15pm 
Seats: Open seats 43 of 80
Room: OP 201

**Steps:**
1. Log into my.sdsu.edu 
2. Click on manage classes tab 
3. Add the class from the test data using the class search and enroll tab
4. Go to the shopping cart tab to see the added class.
5. Select the Aztec Schedule Sync chrome extension

**Expected result:**  course name, professor, class schedule, seats, room and RateMyProfessor link should be 
displayed.
**Actual result:**  course name, professor, class schedule, seats, room and RateMyProfessor link are displayed in the pop up. 
**Status:** Pass 
**Severity:** N/A
**V or V:** N/A
**GitHub Issue:** N/A

---

**Test ID:** MA-02
**From Part 6:** New
**Written by:** Mehla A
**Title:** Test the system's ability to display hybrid status for classes that have online and in-person schedule information.
**Traces to:** REQ-MA-03
**Test type:** Integration 
**Preconditions:**
-The Chrome extension has been added to the device.
- The my.sdsu.edu website is running.
- Available SDSU classes have been added to the shopping cart.
**Test data:** (Fall Semester)
Class: CS 150L Intro to Computer Programming Lab
Professor: M.Thapa | TBA
Class Type: Hybrid Session 
Schedule: Tue 9:30am-10:45am | TBA TBA 
Seats: Closed
Room: HH 128 | TBA 
**Steps:**
1. Log into my.sdsu.edu 
2. Click on manage classes tab 
3. Add the class from the test data using the class search and enroll tab
4. Go to the shopping cart tab to see the added class.
5. Select the Aztec Schedule Sync chrome extension. 

**Expected result:** A description that shows the schedule of the class along with a label for the hybrid status. 
**Actual result:** The popup only shows a schedule description for the online and in-person component without clarifying the hybrid status. 
**Status:** Fail
**Severity:** Minor 
**V or V:** Verification 
**GitHub Issue:** #72

---

**Test ID:** MA-03
**From Part 6:** New 
**Written by:** Mehla A
**Title:** The system ability to display hybrid schedules in a list format rather than in a continuous format. 
**Traces to:** REQ-MA-01
**Test type:** Unit
**Preconditions:** 
- The schedule-formatting function is available for testing.
- The test uses controlled input rather than the live SDSU website or Chrome popup.

**Test data:**
className - CS 150L Intro to Computer Programming Lab
professor - M.Thapa  TBA
schedule - Tue 9:30am-10:45am  TBA TBA 
seats - Closed
room - HH 128 | TBA 
**Steps:**
- Pass the test schedule data directly into the schedule-formatting function in content.js. 
Record the function’s returned output.
Compare the returned output with the expected separated schedule entries.

**Expected result:** Schedule is displayed in separate lines. 
Tue 9:30am-10:45am
TBA TBA 
**Actual result:**  Schedule is displayed in one line with the online and hybrid trailing one after another. 
Tue 9:30am-10:45am TBA TBA 
**Status:** Fail 
**Severity:** Minor 
**V or V:** Verification 
**GitHub Issue:** #73

---

**Test ID:** MA-04
**From Part 6:** New 
**Written by:** Mehla A
**Title:** The system's ability to display the pop-up cart visualizer on windows and mac desktop devices. 
**Traces to:**  NFR-MA-01 
**Test type:** System 
**Preconditions:**
- The Chrome extension has been added to the device.
- The my.sdsu.edu and RateMyProfessor website is running.
- Available SDSU classes have been added to the shopping cart.  
- The user has a mac and windows device.  
**Test data:** (Fall Semester)
Class: CS 150 Intro to Computer programming.
Professor: P.Kraft
Schedule: Mon Wed | 4:00pm-5:15pm 
Seats: Open seats 43 of 80
Room: OP 201

**Steps:**
(The same steps apply to a macOS and windows desktop device)
1. Log into my.sdsu.edu 
2. Click on manage classes tab 
3. Add the class from the test data using the class search and enroll tab
4. Go to the shopping cart tab to see the added class.
5. Select the Aztec Schedule Sync chrome extension

**Expected result:**  course name, professor, class schedule, seats, room and RateMyProfessor link should be displayed for both devices.
**Actual result:**  course name, professor, class schedule, seats, room and RateMyProfessor link are displayed in the pop up for both devices. 
**Status:** Pass 
**Severity:** N/A
**V or V:** N/A
**GitHub Issue:** N/A
---
