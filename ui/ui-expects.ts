import { Locator, Page } from '@playwright/test';
import { step as allureStep } from 'allure-js-commons';

import { BaseExpects } from '../common/base-expects';
import {
	ElementActions,
	WAIT_FOR_LOCATOR_STATE_DEFAULT_TIMEOUT,
} from './utils/element/element-actions';

export class UiExpects extends BaseExpects {
	readonly elementActions: ElementActions;

	constructor(readonly page: Page) {
		super();
		this.elementActions = new ElementActions(page);
	}

	public async assertElementIsVisible(
		locator: Locator,
		elementName: string,
		isSoftExpect: boolean,
		timeout = WAIT_FOR_LOCATOR_STATE_DEFAULT_TIMEOUT,
	): Promise<void> {
		const { isExpectedStateFound, error } = await this.elementActions.getLocatorState(
			locator,
			elementName,
			'visible',
			timeout,
		);

		const expects = this.configureExpect(isSoftExpect, error);

		await allureStep(
			`Checking element "${elementName}" with locator "${locator}" is VISIBLE`,

			async () => expects(isExpectedStateFound).toBeTruthy(),
		);
	}

	public async assertElementHasClass(
		locator: Locator,
		elementName: string,
		expectedClass: string | RegExp,
		isSoftExpect: boolean,
	): Promise<void> {
		const expects = this.configureExpect(
			isSoftExpect,
			`Element "${elementName}" should have class "${expectedClass}"`,
		);

		await allureStep(
			`Checking element "${elementName}" with locator "${locator}" has class "${expectedClass}"`,

			async () => await expects(locator).toHaveClass(expectedClass),
		);
	}
}
