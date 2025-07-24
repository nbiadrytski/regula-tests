import { APIResponse } from '@playwright/test';

import { BaseClient } from './base-client';
import { SERVICE_NAME } from '../utils/service';
import { HTTP_METHOD, RequestParams } from '../api-manager';
import { DetectFacePayload } from '../data/face-api/types/detect-face-payload-type';

export class FaceApiClient extends BaseClient {
	constructor() {
		super();
		this.requestParams = { serviceName: SERVICE_NAME.FACE_API, options: {} };
	}

	async detectFace(
		payload: DetectFacePayload,
		statusCode?: number,
		customRequestParams?: RequestParams,
	): Promise<APIResponse> {
		this.updateRequestParams('api/detect', null, payload);

		const { apiResponse } = await this.sendClientRequest(
			'Detect face',
			HTTP_METHOD.POST,
			statusCode,
			customRequestParams,
		);

		return apiResponse;
	}
}
