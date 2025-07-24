import { ReadStream } from 'node:fs';

import type { APIRequestContext, APIResponse } from '@playwright/test';
import { test, request } from '@playwright/test';

import { ApiExpects } from './api-expects';
import type { SERVICE_NAME } from './utils/service';
import { serviceUrl, requestUrl } from './utils/service';
import { logRequestResponse } from './utils/api-logger';

export const API_REQUEST_TIMEOUT = 30000;

export enum HTTP_METHOD {
	GET = 'GET',
	POST = 'POST',
	DELETE = 'DELETE',
	PATCH = 'PATCH',
	PUT = 'PUT',
}

export class ApiManager {
	readonly apiExpects: InstanceType<typeof ApiExpects>;

	constructor() {
		this.apiExpects = new ApiExpects();
	}

	async send(
		method: HTTP_METHOD,
		requestParams: RequestParams,
		statusCode?: number,
	): Promise<ResponseContext> {
		requestParams.options.method = method;

		return test.step(this.getStepName(requestParams), async () => {
			const context: APIRequestContext = await request.newContext({
				timeout: API_REQUEST_TIMEOUT,
			});
			const response: APIResponse = await context.fetch(
				`${serviceUrl(requestParams.serviceName as SERVICE_NAME)}/${requestParams.endpoint}`,
				requestParams.options,
			);
			await logRequestResponse(requestParams, response);

			if (statusCode) {
				await this.apiExpects.checkStatusCode(response, method, statusCode);
			}
			if (requestParams.options?.data) requestParams.options.data = {};
			if (requestParams.options?.params) requestParams.options.params = {};
			if (requestParams.options?.form) requestParams.options.form = {};

			return {
				apiResponse: response,
				apiRequestContext: context,
			};
		});
	}

	private getStepName(requestParams: RequestParams): string {
		let stepName =
			`Send ${requestParams.options.method} ` +
			requestUrl(requestParams.serviceName as SERVICE_NAME, requestParams.endpoint as string);
		stepName = requestParams.options.params
			? `${stepName} with query params "${JSON.stringify(requestParams.options?.params)}"`
			: stepName;

		return stepName;
	}
}

export interface ResponseContext {
	apiResponse: APIResponse;
	apiRequestContext: APIRequestContext;
}

export interface RequestParams {
	serviceName?: SERVICE_NAME;
	endpoint?: string;
	options: {
		method?: HTTP_METHOD;
		/**
		 * Allows to set post data of the request. If the data parameter is an object, it will be serialized to json string
		 * and `content-type` header will be set to `application/json` if not explicitly set. Otherwise the `content-type`
		 * header will be set to `application/octet-stream` if not explicitly set.
		 */
		data?: any;

		/**
		 * Whether to throw on response codes other than 2xx and 3xx. By default response object is returned for all status
		 * codes.
		 */
		failOnStatusCode?: boolean;

		/**
		 * Provides an object that will be serialized as html form using `application/x-www-form-urlencoded` encoding and sent
		 * as this request body. If this parameter is specified `content-type` header will be set to
		 * `application/x-www-form-urlencoded` unless explicitly provided.
		 */
		form?: { [key: string]: string | number | boolean };

		/**
		 * Allows to set HTTP headers. These headers will apply to the fetched request as well as any redirects initiated by
		 * it.
		 */
		headers?: { [key: string]: string };

		/**
		 * Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.
		 */
		ignoreHTTPSErrors?: boolean;

		/**
		 * Maximum number of request redirects that will be followed automatically. An error will be thrown if the number is
		 * exceeded. Defaults to `20`. Pass `0` to not follow redirects.
		 */
		maxRedirects?: number;

		/**
		 * Provides an object that will be serialized as html form using `multipart/form-data` encoding and sent as this
		 * request body. If this parameter is specified `content-type` header will be set to `multipart/form-data` unless
		 * explicitly provided. File values can be passed either as
		 * [`fs.ReadStream`](https://nodejs.org/api/fs.html#fs_class_fs_readstream) or as file-like object containing file
		 * name, mime-type and its content.
		 */
		multipart?: {
			[key: string]:
				| string
				| number
				| boolean
				| ReadStream
				| {
						/**
						 * File name
						 */
						name: string;

						/**
						 * File type
						 */
						mimeType: string;

						/**
						 * File content
						 */
						buffer: Buffer;
				  };
		};

		/**
		 * Query parameters to be sent with the URL.
		 */
		params?: { [key: string]: string | number | boolean };

		/**
		 * Request timeout in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.
		 */
		timeout?: number;
	};
}
