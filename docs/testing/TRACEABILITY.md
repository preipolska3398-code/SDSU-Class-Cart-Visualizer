# Traceability Matrix

**Team number:** 14
**Filled in by:** Julian Saquic

Fill this in **after** everyone's work is merged. One row per requirement.

## Requirements to Tests

| Requirement ID | From Part 5 | Owner | Test case IDs | Result | GitHub Issue # |
|---|---|---|---|---|---|
| G-CC-01 | New | Carissa Chen | CC-01 | 1 Pass | None |
| REQ-CC-01 | New | Carissa Chen | CC-02 | 1 Pass | None |
| REQ-CC-02 | CR-4 | Carissa Chen | CC-03 | 1 Fail | #69 |
| REQ-CC-03 | CR-5 | Carissa Chen | CC-04 | 1 Fail | #68 |
| NFR-CC-01 | CR-4 | Carissa Chen | None | Untested | None |
| NFR-CC-02 | New | Carissa Chen | CC-05 | 1 Fail | #67 |
| G-JS-01 | New | Julian Saquic | JS-05 | 1 Pass | None |
| REQ-JS-01 | CR-1 | Julian Saquic | JS-01 | 1 Pass | None |
| REQ-JS-02 | New | Julian Saquic | None | Untested | None |
| REQ-JS-03 | New | Julian Saquic | JS-02 | 1 Pass | None |
| REQ-JS-04 | New | Julian Saquic | JS-03 | 1 Fail | #65 |
| NFR-JS-01 | New | Julian Saquic | None | Untested | None |
| NFR-JS-02 | New | Julian Saquic | JS-04 | 1 Pass | None |
| G-ZS-01 | New | Zachary Soriano | ZS-05 | 1 Pass | None |
| REQ-ZS-01 | CR-2 | Zachary Soriano | ZS-04 | 1 Pass | None |
| REQ-ZS-02 | New | Zachary Soriano | ZS-01, ZS-02, ZS-03 | 2 Pass, 1 Fail | #64 |
| REQ-ZS-03 | New | Zachary Soriano | ZS-05 | 1 Pass | None |
| NFR-ZS-01 | New | Zachary Soriano | None | Untested | None |
| REQ-ZS-04 | CR-3 | Zachary Soriano | None | Untested | None |

## Gaps

List any requirement with no test, any test with no requirement, and any Part 5 requirement or Part 6 test that nobody brought over. Write "None" if there are none.

- **Missing teammate section (`MA`):** Mehla Abebe (`Viewing list/dashboard`) has not yet added her section to `REQUIREMENTS.md` or uploaded her test case file (`mehla-a.md`).
- **Requirements without direct test cases:** `NFR-CC-01` (`CC-05` references `NFR-CC-01` in its `Traces to` field, though its title/steps test `NFR-CC-02` unused permissions), `REQ-JS-02`, `NFR-JS-01`, `NFR-ZS-01`, and `REQ-ZS-04` (`ZS-03` tests the multiple-initial-match behavior but lists `REQ-ZS-02` in its `Traces to` field).
- **Part 5 requirements & Part 6 tests:** All 5 Part 5 candidate requirements (`CR-1` through `CR-5`) and all 3 Part 6 unit tests (`TC-1` through `TC-3`) were carried over and upgraded.

## Test Type Coverage

Put a Test ID next to each type. Team minimum: all 7.

| Test type | Test ID |
|---|---|
| Unit | JS-01, ZS-01, ZS-04 |
| Integration | JS-04, ZS-03 |
| System (E2E) | CC-04 |
| Acceptance | CC-01, JS-05, ZS-05 |
| Boundary Value | JS-02 |
| Negative | CC-02, CC-03, JS-03, ZS-02 |
| Security | CC-05 |

## Validation Findings

A Validation finding means the system does what the requirement says, but the requirement does not serve the Stakeholder Goal.

| Requirement ID | Goal it fails | Why | Issue # |
|---|---|---|---|
| REQ-CC-03 | G-CC-01 | The extension only scrapes the SDSU Shopping Cart DOM (`DERIVED_SSR_FL_SSR_DESCR80$`), so when a student browses courses on the SDSU Class Search results page to compare professors before adding classes to their cart, the popup reports "No classes found in shopping cart". | #68 |

**If you found none,** explain in 2 to 3 sentences why every requirement truly serves its Goal:

> N/A — Validation finding documented above (`CC-04` / `#68`).

## Summary

| | Count |
|---|---|
| Part 5 requirements carried over | 5 (`CR-1`, `CR-2`, `CR-3`, `CR-4`, `CR-5`) |
| New requirements added | 14 (`3 Goals`, `7 REQs`, `4 NFRs` across CC, JS, ZS) |
| Part 6 tests upgraded (out of 3) | 3 (`TC-1` → `JS-01`, `TC-2` → `ZS-01`, `TC-3` → `ZS-02`) |
| Total requirements | 19 (`3 Goals`, `11 REQs`, `5 NFRs`) |
| Total test cases | 15 (`5 CC`, `5 JS`, `5 ZS`) |
| Passed | 10 (`CC-01`, `CC-02`, `JS-01`, `JS-02`, `JS-04`, `JS-05`, `ZS-01`, `ZS-02`, `ZS-04`, `ZS-05`) |
| Failed | 5 (`CC-03`, `CC-04`, `CC-05`, `JS-03`, `ZS-03`) |
| Issues opened | 5 (`#64`, `#65`, `#67`, `#68`, `#69`) |
| Critical issues | 0 (`0 Critical`; `1 Major/High` — `#64`, `#68`; `3 Minor` — `#65`, `#67`, `#69`) |

**In one sentence, would you ship this system today? Why or why not?**

> We would not ship this system today because while core shopping cart extraction works for unambiguous full names, multiple initial-only instructor lookups link directly to the wrong Rate My Professors profile (`#64`), missing instructors still trigger bogus searches (`#65`), unused permissions violate least privilege (`#67`), and the extension fails on the Class Search page (`#68`) and logged-out states (`#69`).
