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
| REQ-CC-01 | When the popup is opened on a tab that isn't on https://cmsweb.cms.sdsu.edu/, the popup shall display "Could not connect to SDSU page." | Confirmed | New |
| REQ-CC-02 | When the user is logged out of SDSU (or the session has expired) and opens the popup, the popup shall display a message telling the user to log in to SDSU, not "No classes found in shopping cart." | Suspected bug | CR-4 (Suspected bug): The system shall check token expiration before sending shopping cart request data. |
| REQ-CC-03 | When the popup is opened on an SDSU Class Search results page that lists at least one class, the popup shall list at least one class with its professor name. | Suspected bug | CR-5 (Suspected bug): The system shall extract class information from the SDSU class search page. |


| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| NFR-CC-01 | (Security, least privilege) Every permission listed in manifest.json shall be used by at least one line of the extension's code. | Suspected bug | New |

---

## Section: Input (Julian Saquic)

### Stakeholder Goals


| ID | Stakeholder | Goal |
|---|---|---|
| G-JS-01 | SDSU student planning classes | Have my course names, schedules, rooms, seats, and instructor names automatically captured and normalized from my SDSU shopping cart without manually typing or reformatting them. |

### Functional Requirements


| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| REQ-JS-01 | When `cleanInstructorName()` receives an instructor string formatted as `"Last, First"` with leading, trailing, or extra internal whitespace (e.g., `"  Turing,   Alan  "`), it shall return `"First Last"` (`"Alan Turing"`). | Confirmed | CR-1 (Confirmed): The system shall convert instructor names formatted as "Last, First" into "First Last". |
| REQ-JS-02 | When `content.js` receives the `{ action: "requestData" }` message on an SDSU shopping cart page containing `n` course rows (`[id^="DERIVED_SSR_FL_SSR_DESCR80$"]`), `getShoppingCartClasses()` shall return an array of `n` objects, each containing trimmed `className`, `professor`, `schedule`, `room`, and `seats` strings. | Confirmed | New |
| REQ-JS-03 | When a shopping cart course row is missing its instructor element (`DERIVED_REGFRM1_SSR_INSTR_LONG$i`) or optional table columns (schedule, room, or seats), `getShoppingCartClasses()` shall assign `"Professor not found"` to `professor` and `""` to any missing optional column without throwing an error. | Confirmed | New |
| REQ-JS-04 | When an extracted instructor name is empty, `"To Be Announced"` (case-insensitive), or `"Professor not found"`, the system shall suppress the `findRateMyProfessor` lookup request for that course. | Suspected bug | New |

### Non-Functional Requirements


| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| NFR-JS-01 | (Performance) `getShoppingCartClasses()` shall scrape and return course data for a shopping cart of up to 10 courses in under 100 milliseconds. | Confirmed | New |
| NFR-JS-02 | (Maintainability / Robustness) `getShoppingCartClasses()` shall locate the schedule, room, and seats columns dynamically by matching table header (`<th>`) text patterns ('/day|time|schedule/i', `/room|location/i`, `/seat|enrollment|capacity/i`) rather than hardcoded column indices, so reordering columns does not break extraction. | Confirmed | New |

---

## Section: Interactions/Ouputs (Zachary Soriano)

### Stakeholder Goals


|---|---|---|
| G-ZS-01 | SDSU student | View shopping cart classes and access assigned professor's RMP profile without manually searching for each instructor |

### Functional Requirements


|---|---|---|---|
| REQ-ZS-01 | When a course's instructor name contains "to be announced" ignoring caps, the popup should display course infromation without trying to send a request for professor's RMP link for that course| Confirmed | CR2: The system shall suppress the Rate My Professor lookup process when the instructor name contains "to be announced". |
| REQ-ZS-02 | When a professor lookup returns a url comtaining /professor/, the popup should display an Open Rate My Professor link pointing to the url. Selecting the link opens the link in a new tab| Confirmed | New |
| REQ-ZS-03 | When a lookup returns a search URL, returns no url, or reports a messaging error, the popup should display: "Professor profile not found", and a "Search Rate My Professors" linl which when opened should open the SDSU RMP search URL.| Confirmed | New |
| REQ-ZS-05 | When RMP lookup results contain exactly one candidate whose full first name matches the SDSU instructor and whose hyphenated surname contains the SDSU surname as an exact hyphen-separated component, the system shall return that candidate's profile URL. If multiple candidates qualify, it shall return the search URL instead. | Suspected bug | New (ZS-06) |

### Non-Functional Requirements


| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| NFR-ZS-01 | Every rmp link opened shall use rel="noopener nonreferrer" so that the destination page cannot acces the originating winodw through window.opener and gets no reference information| Confirmed | New |

### Example of a Good Rewrite


| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| REQ-ZS-04 | Given an instructor name ie. "J Smith" and lookup results containing boht "John Smith" and "Jane Smith", the popup should display "Professor profile not found", and a "Search Rate My Professors" link to the SDSU RMP serch results for "J Smith" rather than directly to either professor. | Suspected bug | CR-3: The system shall link directly to a Rate My Professor search page when a single professor initial matches multiple full names. |

---

## Section: Viewing List/ Dashboard (Mehla Abebe)

### Stakeholder Goals


| ID | Stakeholder | Goal |
| G-MA-01 | SDSU Student | An SDSU Student should be able to see a pop-up summary of the classes in their cart with a RateMyProfessor link.|


### Functional Requirements


| ID | Requirement | Status | From Part 5 |
| REQ-MA-01 |The system shall display hybrid schedules in a list format rather than in a continuous format.  | Suspected Bug | New|
| REQ-MA-02 |The system shall convert instructor names formatted as "Last, First" into "First Last".|Confirmed| CR-1|
| REQ-MA-03 | The system shall display hybrid status for classes that have online and in-person schedule information. | Suspected Bug | New |


### Non-Functional Requirements


| ID | Requirement | Status | From Part 5 |
| NFR-MA-01 | The system shall display the pop-up cart visualizer on windows and macOS desktop devices| Confirmed | New |

---








