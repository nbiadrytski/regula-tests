import { test as base } from '@playwright/test';

import { FaceApiPageSteps } from '../steps/face-api-page-steps';

export type UiSetupFixtures = {
	faceApiPageSteps: FaceApiPageSteps;
};

export const uiSetupFixtures = base.extend<UiSetupFixtures>({
	faceApiPageSteps: async ({ page }, use) => use(new FaceApiPageSteps(page)),
});
