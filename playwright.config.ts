import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	timeout: 600 * 1000,
	fullyParallel: true,
	retries: 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: [
		['line'],
		['html'],
		[
			'allure-playwright',
			{
				detail: false,
				resultsDir: './allure-results',
				suiteTitle: false,
			},
		],
	],
	use: {
		baseURL: 'https://faceapi.regulaforensics.com',
		trace: 'retain-on-failure',
		headless: false,
		screenshot: {
			mode: 'only-on-failure',
			fullPage: true,
		},
		video: 'retain-on-failure',
	},
	projects: [
		{
			name: 'ui',
			use: { ...devices['Desktop Chrome'] },
			testDir: './ui/tests',
		},
		{
			name: 'api',
			use: {},
			testDir: './api/tests',
		},
	],
});
