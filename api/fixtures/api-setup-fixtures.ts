import { test as base } from 'playwright/test';

import { FaceApiClientSteps } from '../steps/face-api-client-steps';

export type ApiSetupFixtures = {
	faceApiClientSteps: FaceApiClientSteps;
};

export const apiSetupFixtures = base.extend<ApiSetupFixtures>({
	faceApiClientSteps: async ({}, use) => use(new FaceApiClientSteps()),
});
