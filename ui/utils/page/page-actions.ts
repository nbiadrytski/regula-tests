import { Page } from '@playwright/test';
import { step as allureStep } from 'allure-js-commons';

export type GoToPageOptions = {
	referer?: string;
	timeout?: number;
	waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit';
};

export class PageActions {
	constructor(readonly page: Page) {}

	async navigateTo(url: string, options?: GoToPageOptions): Promise<void> {
		await allureStep(
			`Go to page "${url}"`,

			async () => await this.page.goto(url, options),
		);
	}
}
