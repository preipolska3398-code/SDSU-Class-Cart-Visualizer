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
| REQ-MG-01 | The system shall reject a profile bio longer than 280 characters with the error "Bio must be 280 characters or fewer." | Suspected bug | CR-3 (Unconfirmed): The system shall limit the bio to 280 characters. |
| NFR-MG-01 | The profile page loads in under 2 seconds with 100 profiles in the database. | Confirmed | New |

---

## Section: [Your Area] ([Your Name])

### Stakeholder Goals

| ID | Stakeholder | Goal |
|---|---|---|
| | | |

### Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| | | | |
| | | | |
| | | | |

### Non-Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| | | | |

---

## Section: [Your Area] ([Your Name])

### Stakeholder Goals

| ID | Stakeholder | Goal |
|---|---|---|
| | | |

### Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| | | | |
| | | | |
| | | | |

### Non-Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| | | | |

---

## Section: [Your Area] ([Your Name])

### Stakeholder Goals

| ID | Stakeholder | Goal |
|---|---|---|
| | | |

### Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| | | | |
| | | | |
| | | | |

### Non-Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| | | | |
