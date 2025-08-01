import { APIResponse } from '@playwright/test';
import { epic, story, suite, tags } from 'allure-js-commons';

import { commonFixtures as testFaceApi } from '../../common/fixtures/common-fixtures';
import { detectFaceBasePayload } from '../data/face-api/payloads/detect-face-base-paylaod';


testFaceApi.describe('Regula Face SDK Web API', () => {
	testFaceApi(
		'Face cannot be detected with an image without a face',
		async ({ faceApiClientSteps }) => {
			await suite('API');
			await epic('Regula Face SDK Web API');
			await story('Detect face');
			await tags('API', 'FaceAPI');

			const apiResponse: APIResponse = await faceApiClientSteps.detectFace(
				detectFaceBasePayload(),
				200,
			);
			const responseJson = await apiResponse.json();

			await faceApiClientSteps.apiExpects.checkValuesAreEqual(
				responseJson.msg,
				'FR_FACE_NOT_DETECTED',
				false,
				'Try to detect a face in the image without a face',
			);
		},
	);
});
