# ParaBank Test Automation Framework

An end-to-end test automation project built against [ParaBank](https://parabank.parasoft.com/), a demo banking application, using **Playwright with TypeScript** and the **Page Object Model** design pattern. Includes backend data validation via direct SQL queries, and a Jenkins CI pipeline that runs the full suite automatically on every push.

## What this project demonstrates

- UI test automation with Playwright (TypeScript), structured using Page Object Model
- Positive and negative test coverage (valid login, invalid login)
- Business-logic validation, not just UI checks — e.g. asserting an account balance changes by the exact correct amount after a transfer, not just that a success message appears
- Backend data integrity checks via SQL, querying the application's database directly to confirm UI actions produced correct database writes
- CI/CD integration — a Jenkins pipeline (`Jenkinsfile`) that installs dependencies, installs Playwright's browsers fresh, and runs the full cross-browser suite on every push

## Tech stack

- **Playwright** (TypeScript) — browser automation
- **Page Object Model** — test structure/design pattern
- **Docker** — self-hosting the ParaBank application locally, with full database access
- **HSQLDB / DBeaver** — direct SQL querying for backend validation
- **Jenkins** — CI pipeline, triggered on push

## Test coverage

| Test             | What it validates                                                                 |
| ---------------- | --------------------------------------------------------------------------------- |
| Valid login      | User can log in with correct credentials                                          |
| Invalid login    | Appropriate error shown for incorrect credentials                                 |
| Fund transfer    | Transfer completes, and account balance decreases by the exact transferred amount |
| Account creation | New account can be opened and appears on the account overview                     |

## Running it locally

1. Start ParaBank locally via Docker:
   ```bash
   docker run -d --name parabank -p 9090:8080 -p 61616:61616 -p 9001:9001 parasoft/parabank
   ```
