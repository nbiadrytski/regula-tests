import { suite, epic, story, tags } from 'allure-js-commons';

import { commonFixtures as testFaceApiPage } from '../../common/fixtures/common-fixtures';
import {
	FaceApiDetailsTab,
	FaceApiDetailsTabDownloadBarButton,
	FaceApiTab,
} from '../pages/face-api-page';

testFaceApiPage.describe('Regula Face SDK Web API page', () => {
	testFaceApiPage.beforeEach(async ({ faceApiPageSteps }) => {
		await suite('UI');
		await epic('Regula Face SDK Web API');
		await story('Face API types tabs');
		await tags('UI', 'FaceAPI');

		await faceApiPageSteps.goToPage();
	});

	testFaceApiPage(
		'Check Face API tabs are visible and "Liveness detection" tab is active',
		async ({ faceApiPageSteps }) => {
			await faceApiPageSteps.assertFaceApiTabIsActive(FaceApiTab.LivenessDetection);

			await faceApiPageSteps.assertTryFaceLivenessButtonIsVisible();
		},
	);

	for (const tab of [
		FaceApiTab.FaceMatching,
		FaceApiTab.FaceDetection,
		FaceApiTab.FaceImageQuality,
	]) {
		testFaceApiPage(
			`Assert "${tab}" tab's Results, Request, Response tabs and their Download bar buttons are visible`,
			async ({ faceApiPageSteps }) => {
				await faceApiPageSteps.openFaceApiTab(tab);

				for (const tab of Object.values(FaceApiDetailsTab)) {
					await faceApiPageSteps.openFaceApiDetailsTab(tab);

					for (const button of Object.values(FaceApiDetailsTabDownloadBarButton)) {
						await faceApiPageSteps.assertFaceApiDetailsTabDownloadBarButtonIsVisible(
							button,
						);
					}
				}
			},
		);
	}
});
