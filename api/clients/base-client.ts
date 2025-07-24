import { step as allureStep } from 'allure-js-commons';

import { HTTP_METHOD, RequestParams, API_REQUEST_TIMEOUT, ApiManager } from '../api-manager';
import type { ResponseContext } from '../api-manager';
import { deepMergeObjects } from '../../common/utils/object-utils';
import { ApiExpects } from '../api-expects';

export class BaseClient {
	protected readonly apiManager: ApiManager;
	protected requestParams: RequestParams;
	readonly apiExpects: ApiExpects;

	constructor() {
		this.apiManager = new ApiManager();
		this.requestParams = { options: { timeout: API_REQUEST_TIMEOUT } };
		this.apiExpects = new ApiExpects();
	}

	protected async sendClientRequest(
		stepName: string,
		httpMethod: HTTP_METHOD,
		statusCode?: number,
		customRequestParams?: RequestParams,
	): Promise<ResponseContext> {
		return await allureStep(stepName, async () => {
			console.log(stepName);
			let response: ResponseContext;
			if (customRequestParams) {
				response = await this.apiManager.send(
					httpMethod,
					deepMergeObjects(this.requestParams, customRequestParams),
					statusCode,
				);
			} else {
				response = await this.apiManager.send(httpMethod, this.requestParams, statusCode);
			}

			return response;
		});
	}

	protected updateRequestParams(
		endpoint: string,
		headers?: { [key: string]: string } | null,
		payload?: any,
		queryParams?: { [key: string]: string } | null,
		formData?: { [key: string]: string | number | boolean } | null,
	): RequestParams {
		this.requestParams.endpoint = endpoint;
		if (headers) this.requestParams.options.headers = headers;
		if (payload) this.requestParams.options.data = payload;
		if (queryParams) this.requestParams.options.params = queryParams;
		if (formData) this.requestParams.options.form = formData;

		return this.requestParams;
	}
}
