import { APIResponse, expect } from '@playwright/test';
import { step as allureStep } from 'allure-js-commons';

import { BaseExpects } from '../common/base-expects';
import { HTTP_METHOD } from './api-manager';

export class ApiExpects extends BaseExpects {
	async checkStatusCode(
		actualResponse: APIResponse,
		requestMethod: HTTP_METHOD,
		expectedCode: number,
	): Promise<void> {
		await allureStep(`Expecting status code: ${expectedCode}`, async () => {
			expect(
				actualResponse.status(),
				`${requestMethod} ${actualResponse.url()} status code must be: ${expectedCode}`,
			).toBe(expectedCode);
		});
	}
}
