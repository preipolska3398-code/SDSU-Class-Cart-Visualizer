# Testable Requirements: Aztec Schedule Sync

**Team number:** [14]
**Inherited from:** Team [13]

## Who Owns What

| Area of the system | Owner | ID prefix |
|---|---|---|
| Session and permissions | Carissa Chen | CC |Add a comment on  line R10Add diff commentMarkdown input:  edit mode selected.WritePreviewAdd a suggestionHeadingBold(control b) control⌃ bBItalic(control i) control⌃ iIQuote(control shift right angle bracket) control⌃ shift⇧ right angle bracket>Code(control e) control⌃ eELink(control k) control⌃ kKUnordered list(control 8) control⌃ 88Numbered list(control shift ampersand) control⌃ shift⇧ ampersand&Task list(control shift l) control⌃ shift⇧ lLMentionReferenceSlash commandsMore itemsSaved repliesPaste, drop, or click to add filesCancelCommentStart a review
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
