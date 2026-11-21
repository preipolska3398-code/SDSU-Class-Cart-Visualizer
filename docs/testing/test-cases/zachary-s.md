# Test Cases: Zachary-S

**Team number:** 14
**My area:** Interactions/output

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

**Test ID: ZS-06**
**From Part 6: New**
**Written by: Zachary Soriano**
**Title: SDSU surname matches a component of a unique RMP hyphenated surname**
**Traces to: G-ZS-01**
**Test type: Integration / Boundary Value**
**Preconditions:Load background.js for chrome.runtime.onMessage.addListener. Supply one RMP Teacher candidate.**
**Test data: SDSU instructor = "Jorge Hernandez"; RMP firstName = "Jorge", lastName = "Hernandez-Calderon"**

**Steps:**
1. Have a class with Jorge Hernandez-Calderon in the cart
2. Open the extension
3. Identify the class with Jorge, and sees that it fails to identify him.

**Expected result: Return a RMP link to Jorge Hernandez-Calderon**
**Actual result: Professor not found**
**Status: Fail**
**Severity: Major (PR4 severity: Medium; proposed priority: Medium)**
**V or V: Validation**
**GitHub Issue: Pending verification; no confirmed Issue URL recorded.**
**GitHub Issue: #76**


---

**Test ID: ZS-01**
**From Part 6: TC-2** (old test number, or New)
**Written by: Zachary Soriano**
**Title:  A first initial matches a compatible full first name**
**Traces to: REQ-ZS-02**
**Test type: Unit** (Unit / Integration / System / Acceptance / Boundary Value / Negative / Security)
**Preconditions: Load background.js for chrome.runtime.onMessage.addListener**
**Test data: sdsuName = "J Smith", rmpName = "John Smith**

**Steps:**
1. Call namesMatch("J Smith", "John Smith").
2. Record the returned Boolean.

**Expected result: True**
**Actual result: True**
**Status: Pass** (Pass / Fail)
**Severity: N/A** (Critical / Major / Minor, Fail only)
**V or V: N/A** (Verification / Validation, Fail only)
**GitHub Issue: N/A** (#number, Fail only)

---

**Test ID:ZS-02**
**From Part 6: TC-3** (old test number, or New)
**Written by: Zachary Soriano**
**Title: A different first initial is rejected**
**Traces to: REQ-ZS-02**
**Test type: Negative**
**Preconditions: Load background.js for chrome.runtime.onMessage.addListener**
**Test data: sdsuName = "J Smith"; rmpName = "Adam Smith"**

**Steps:**
1. Call namesMatch("J Smith", "Adam Smith").
2. Record the returned Boolean.

**Expected result: false**
**Actual result:false**
**Status: pass**
**Severity: n/a**
**V or V: n/a**
**GitHub Issue: n.a**

---

**Test ID: ZS-03**
**From Part 6: New** (old test number, or New)
**Written by: Zachary Soriano**
**Title: multiple professor intial/last name matches**
**Traces to: REQ-ZS-02**
**Test type: Integration**
**Preconditions: load background.ks for for chrome.runtime.onMessage.addListener. Replace fetch in the context with a successful response, but has multiple matches**
**Test data: Instructor: "J Smith" --> J Smith found (ie. "John Smith", "Jane Smith", "Jacky Smith")**

**Steps:**
1. Call findRateMyProfessor("J Smith").
2. Await the returned result.
3. Record its direct and url properties.

**Expected result: direct link not provided, and obtain: https://www.ratemyprofessors.com/search/professors/877?q=J%20Smith**
**Actual result: direct was true and url provided was directly to any of the "J Smith" that were found.**
**Status:Fail**
**Severity:High**
**V or V: Verification**
**GitHub Issue: #64**

---

**Test ID: Zs-04**
**From Part 6:New** (old test number, or New)
**Written by:Zachary Soriano**
**Title: Unassigned instructor produces no RMP lookup**
**Traces to: REQ-Zs-01**
**Test type:Unit**
**Preconditions:Run popup.js with a simulated DOM. Make tab message response return course, record run time**
**Test data: className: "math 101", "professor":"to be announced**

**Steps:**
1. execute the popup handler
2. inspect displayed class and professor text
3. count the number of RMP lookup requests

**Expected result: shows the class with 0 rmp lookup messages and creates no links**
**Actual result: both text values are displayed, zero rmp were sent or created**
**Status:pass**
**Severity:n/a**
**V or V:n/a**
**GitHub Issue:n/a**

---

**Test ID: Zs-05**
**From Part 6:New** (old test number, or New)
**Written by:Zachary Soriano**
**Title:  A student can access professor information from the cart**
**Traces to: G-ZS-01, REQ-ZS-03**
**Test type:acceptance**
**Preconditions:the inherited extension is loaded to chrome, student is logged into sdsu with at least one shopping cart course witha  named instructor**
**Test data: className: "math 101", "professor":"to be announced**

**Steps:**
1. open the SDSU shopping cart containing the recorded course.
2. open the extension popup.
3. locate that course and its instructor.
4. wait for the lookup to finish.
5. select the professor profile or search link.
6. verify the destination and whether the instructor name was
   supplied without manually typing it.

**Expected result: pipup displays the recorded course and instructor. it links to open a new tab containing the correct professor profile**
**Actual result:popup displays correcrtly**
**Status:pass**
**Severity:n/a**
**V or V:n/a**
**GitHub Issue:n/a**

---
