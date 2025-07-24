import { expect, type Expect } from '@playwright/test';
import { step as allureStep } from 'allure-js-commons';

export class BaseExpects {
	public async checkValuesAreEqual(
		actual: string | number,
		expected: string | number,
		isSoftExpect: boolean,
		message: string,
	): Promise<void> {
		const expects = this.configureExpect(
			isSoftExpect,
			`${message}: actual value should be equal to expected`,
		);
		await allureStep(
			`${message}: checking actual value "${actual}" equals to expected "${expected}"`,

			async () => expects(actual).toEqual(expected),
		);
	}

	protected configureExpect(isSoft: boolean, errorMessage: string): Expect {
		return expect.configure({
			soft: isSoft,
			message: `Expect failed... ${errorMessage}`,
		});
	}
}
