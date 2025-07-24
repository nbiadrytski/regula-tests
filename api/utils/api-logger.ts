import type { APIResponse } from '@playwright/test';

import type { RequestParams } from '../api-manager';
import { requestUrl } from './service';

const assignHeaders = (targetObject: any, arrayOfObjects: any[]): any => {
	for (const header of arrayOfObjects) {
		targetObject[header.name] = header.value;
	}
	return targetObject;
};

export const logRequestResponse = async (
	requestParams: RequestParams,
	response: APIResponse,
): Promise<void> => {
	if (requestParams?.options?.method && requestParams?.serviceName && requestParams?.endpoint) {
		logWithTimestamp(
			`${requestParams.options.method} ` +
				`${requestUrl(requestParams.serviceName, requestParams.endpoint)}`,
		);
	}

	if (requestParams?.options?.params) {
		console.log(`QUERY PARAMS: ${jsonStringFormatted(requestParams.options.params)}`);
	}

	if (requestParams?.options?.data) {
		console.log(`REQUEST BODY: ${jsonStringFormatted(requestParams.options.data)}`);
	}

	if (requestParams?.options?.form) {
		console.log(`FORM DATA: ${jsonStringFormatted(requestParams.options.form)}`);
	}

	const requestHeaders = assignHeaders({}, response.headersArray());
	console.log(
		`REQUEST HEADERS: ${jsonStringFormatted({
			...requestHeaders,
			...requestParams.options?.headers,
		})}`,
	);

	console.log(`STATUS CODE: ${response.status()}`);

	try {
		const responseBody = await response.json();
		logWithTimestamp(`RESPONSE BODY: ${jsonStringFormatted(responseBody)}`);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error: unknown) {
		logWithTimestamp(`RESPONSE BODY: ${await response.text()}`);
	}

	console.log(`RESPONSE HEADERS: ${jsonStringFormatted(response.headers())}`);
	console.log('*'.repeat(60) + '\n');
};

export const jsonStringFormatted = (object: unknown): string => {
	return JSON.stringify(object, null, 2);
};

export const logWithTimestamp = (message: string): void => {
	console.log('[' + new Date().toISOString().substring(11, 23) + '] -', message);
};
