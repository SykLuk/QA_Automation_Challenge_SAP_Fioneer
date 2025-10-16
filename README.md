# Playwright E2E Test Suite

Automated end-to-end tests for https://www.sapfioneer.com/ using Playwright Test framework.

## Project Structure

```
tests/
├── pages/
│   ├── HomePage.ts          # Home page object with locators and methods
│   └── ContactPage.ts       # Contact page object with form locators
├── test1_endtoend.spec.ts   # Card section validation tests
├── test2_esg-navigation.spec.ts  # Navigation flow tests
└── test3_contact-form.spec.ts    # Contact form validation tests
playwright.config.ts         # Playwright configuration
package.json                 # Dependencies and scripts
```

## Dependencies

- **@playwright/test** (^1.40.0) - E2E testing framework
- **@faker-js/faker** (^10.1.0) - Test data generation
- **@types/node** (^24.7.2) - TypeScript Node.js types

## Quick Start

### 1. Install dependencies

Use cmd.exe if PowerShell has execution policy restrictions:

```powershell
cmd /c "npm install"
```

Or with npm directly:

```bash
npm install
```

### 2. Install Playwright browsers

```powershell
cmd /c "npx playwright install"
```

Or:

```bash
npx playwright install
```

### 3. Run all tests

```powershell
cmd /c "npx playwright test"
```

Or:

```bash
npx playwright test
```

### 4. Run specific test file

```bash
npx playwright test test1_endtoend.spec.ts
npx playwright test test2_esg-navigation.spec.ts
npx playwright test test3_contact-form.spec.ts
```

### 5. Run tests in UI mode (interactive)

```bash
npx playwright test --ui
```

### 6. Generate and view test report

After running tests, Playwright automatically generates an HTML report. To view it:

```bash
npx playwright show-report
```

**Note**: The HTML report is generated automatically after each test run and stored in the `playwright-report` directory. The `show-report` command opens it in your default browser.

You can also generate a report explicitly:

```bash
# Run tests and generate report
npx playwright test

# Open the report
npx playwright show-report
```
There is also online report available on gitub: https://sykluk.github.io/QA_Automation_Challenge_SAP_Fioneer/


## Page Object Model

This project uses the Page Object Model (POM) pattern for better maintainability and reusability.

## Configuration

**Base URL**: `https://www.sapfioneer.com`
**Test Directory**: `./tests`
**Browser**: Chromium (Desktop Chrome)
**Parallel Execution**: Enabled
**Retries on CI**: 2
**Reporter**: HTML

