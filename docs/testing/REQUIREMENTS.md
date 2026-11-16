# Testable Requirements: Aztec Schedule Sync

**Team number:** 14
**Inherited from:** Team 13

## Who Owns What

| Area of the system | Owner | ID prefix |
|---|---|---|
| Session and permissions | Carissa Chen | CC |
| Input | Julian Saquic | JS |
| Viewing list/dashboard | Mehla Abebe | MA |
| Interactions/output | Zachary Soriano | ZS |

<!--
RULES
- Only edit YOUR OWN section below. This keeps merge conflicts away.
- Categories: G = Stakeholder Goal, REQ = Functional, NFR = Non-Functional.
- "From Part 5": write the original CR ID and its text from SYSTEM_MAP.md. Write "New" if you added it this sprint.
- Status: Confirmed or Suspected bug. No Unconfirmed allowed. Every Suspected bug needs a GitHub Issue.
- The test: could a stranger write a Pass or Fail test without asking you a question?
-->

---


## Section: Sessions and Permissions (Carissa Chen)

### Stakeholder Goals

| ID | Stakeholder | Goal |
|---|---|---|
| G-CC-01 | SDSU student planning classes | See professor ratings for my shopping cart classes using my existing SDSU login, without my SDSU account data leaving my browser.|

### Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| REQ-CC-01 | When the popup is opened on a tab that isn't on https://cmsweb.cms.sdsu.edu/, the popup shall display "Could not connect to SDSU page." and make no request to ratemyprofessors.com. | Confirmed | New |
| REQ-CC-02 | When the user is logged out of SDSU (or the session has expired) and opens the popup, the popup shall display a message telling the user to log in to SDSU, not "No classes found in shopping cart." | Suspected bug | CR-4 (Suspected bug): The system shall check token expiration before sending shopping cart request data. |
| REQ-CC-03 | When the popup is opened on an SDSU Class Search results page that lists at least one class, the popup shall list at least one class with its professor name. | Suspected bug | CR-5 (Suspected bug): The system shall extract class information from the SDSU class search page. |

### Non-Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| NFR-CC-01 | (Security) Requests the extension sends to ratemyprofessors.com shall contain no SDSU cookies and no shopping cart data other than the professor name. | Confirmed | CR-4 (Suspected bug): The system shall check token expiration before sending shopping cart request data.|
| NFR-CC-02 | (Security, least privilege) Every permission listed in manifest.json shall be used by at least one line of the extension's code. | Suspected bug | New |

### Example of a Good Rewrite

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| REQ-ZS-04 | Given an instructor name ie. "J Smith" and lookup results containing boht "John Smith" and "Jane Smith", the popup should display "Professor profile not found", and a "Search Rate My Professors" link to the SDSU RMP serch results for "J Smith" rather than directly to either professor. | Suspected bug | CR-3: The system shall link directly to a Rate My Professor search page when a single professor initial matches multiple full names. |
| NFR-MG-01 | The profile page loads in under 2 seconds with 100 profiles in the database. | Confirmed | New |

---

## Section: Interactions/Ouputs (Zachary Soriano)

### Stakeholder Goals

| ID | Stakeholder | Goal |
|---|---|---|
| G-ZS-01 | SDSU student | View shopping cart classes and access assigned professor's RMP profile without manually searching for each instructor |

### Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| REQ-ZS-01 | When a course's instructor name contains "to be announced" ignoring caps, the popup should display course infromation without trying to send a request for professor's RMP link for that course| Confirmed | CR2: The system shall suppress the Rate My Professor lookup process when the instructor name contains "to be announced". |
| REQ-ZS-02 | When a professor lookup returns a url comtaining /professor/, the popup should display an Open Rate My Professor link pointing to the url. Selecting the link opens the link in a new tab| Confirmed | New |
| REQ-ZS-03 | When a lookup returns a search URL, returns no url, or reports a messaging error, the popup should display: "Professor profile not found", and a "Search Rate My Professors" linl which when opened should open the SDSU RMP search URL.| Confirmed | New |

### Non-Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| NFR-ZS-01 | Every rmp link opened shall use rel="noopener nonreferrer" so that the destination page cannot acces the originating winodw through window.opener and gets no reference information| Confirmed | New |

### Example of a Good Rewrite

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| REQ-ZS-04 | Given an instructor name ie. "J Smith" and lookup results containing boht "John Smith" and "Jane Smith", the popup should display "Professor profile not found", and a "Search Rate My Professors" link to the SDSU RMP serch results for "J Smith" rather than directly to either professor. | Suspected bug | CR-3: The system shall link directly to a Rate My Professor search page when a single professor initial matches multiple full names. |

---