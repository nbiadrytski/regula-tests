# Regula Face API Tests

![Playwright](https://img.shields.io/badge/Playwright-1.54.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Allure Report](https://img.shields.io/badge/Allure-3.3.2-orange)

Automated test suite for Regula https://faceapi.regulaforensics.com/ page and Face Detection API using Playwright and TypeScript.

## 📦 Prerequisites

- Node.js v18+
- npm v9+
- Playwright browsers (installed automatically)

## 🚀 Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/regula-tests.git
   cd regula-tests
   

2. Install dependencies:
    ```bash
    npm install
   
3. Install Playwright browsers:
    ```bash
    npx playwright install
   
## 🧪 Running Tests

1. UI Tests:
    ```bash
    npm run test-ui
   
2. API Tests:
    ```bash
    npm run test-api

## 📊 Test Reports
See Allure report examples in ``allure-report-screenshots`` folder

1. Generate Allure report:
    ```bash
    npm run generate-allure-report
   
2. Open Allure report locally:
    ```bash
    npm run open-allure-report

## 🛠️ Development Tools

- Check for linting errors
    ```bash
    npm run lint

- Automatically fix linting errors
    ```bash
    npm run lint:fix

- Format all files
    ```bash
    npm run format

- Check formatting without changes
    ```bash
    npm run format:check