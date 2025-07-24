import { Locator, Page } from '@playwright/test';
import { step as allureStep } from 'allure-js-commons';

export type ClickOptions = {
	button?: 'left' | 'right' | 'middle';
	position?: {
		x: number;
		y: number;
	};
	force?: boolean;
	timeout?: number;
};

type LocatorState = 'attached' | 'detached' | 'visible' | 'hidden';

type LocatorStateDetectedOrError = {
	isExpectedStateFound: boolean;
	error: string;
};

export const WAIT_FOR_LOCATOR_STATE_DEFAULT_TIMEOUT = 15000;

export class ElementActions {
	constructor(readonly page: Page) {}

	async clickElement(
		locator: Locator,
		elementName: string,
		options?: ClickOptions,
	): Promise<void> {
		await allureStep(
			`Click element "${elementName}" with locator "${locator}"`,

			async () => await locator.click(options),
		);
	}

	async waitForElement(
		locator: Locator,
		elementName: string,
		state: LocatorState,
		timeout = WAIT_FOR_LOCATOR_STATE_DEFAULT_TIMEOUT,
	): Promise<void> {
		await allureStep(
			`Wait for element "${elementName}" with locator "${locator}" 
            in ${state.toUpperCase()} state for ${timeout} ms`,

			async () => await locator.waitFor({ state, timeout }),
		);
	}

	async getLocatorState(
		locator: Locator,
		elementName: string,
		state: LocatorState,
		timeout = WAIT_FOR_LOCATOR_STATE_DEFAULT_TIMEOUT,
	): Promise<LocatorStateDetectedOrError> {
		try {
			await this.waitForElement(locator, elementName, state, timeout);
			return {
				isExpectedStateFound: true,
				error: '',
			};
		} catch (err: any) {
			return {
				isExpectedStateFound: false,
				error: err.toString(),
			};
		}
	}
}
