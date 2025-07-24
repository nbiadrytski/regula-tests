import { Page } from '@playwright/test';
import { step as allureStep } from 'allure-js-commons';

import {
	FaceApiDetailsTab,
	FaceApiDetailsTabDownloadBarButton,
	FaceApiPage,
	FaceApiTab,
} from '../pages/face-api-page';

export class FaceApiPageSteps extends FaceApiPage {
	constructor(override readonly page: Page) {
		super(page);
	}

	async goToPage(): Promise<void> {
		await allureStep(`Open Regula Face SDK Web API page`, async () => {
			await this.navigateToPage();

			await this.uiExpects.assertElementIsVisible(
				this.headings.faceSdkWebApi(),
				'heading "Regula Face SDK Web API"',
				false,
			);
		});
	}

	async assertFaceApiTabIsActive(tabName: FaceApiTab, isSoftExpect = true): Promise<void> {
		await allureStep(
			`Check Face API tab "${tabName}" is active`,

			async () => {
				await this.uiExpects.assertElementHasClass(
					this.faceApiTab.byTextName(tabName),
					'Face API tab',
					/NavTabs_active/,
					isSoftExpect,
				);
			},
		);
	}

	async openFaceApiTab(tabName: FaceApiTab): Promise<void> {
		await allureStep(
			`Open Face API tab "${tabName}"`,

			async () => {
				await this.clickFaceApiTab(tabName);
				await this.assertFaceApiTabIsActive(tabName, false);
			},
		);
	}

	async assertFaceApiDetailsTabIsActive(
		tabName: FaceApiDetailsTab,
		isSoftExpect = true,
	): Promise<void> {
		await allureStep(
			`Check Face API details tab "${tabName}" is active`,

			async () => {
				await this.uiExpects.assertElementHasClass(
					this.faceApiDetailsTab.byName(tabName),
					'Face API details tab',
					/activeTab/,
					isSoftExpect,
				);
			},
		);
	}

	async openFaceApiDetailsTab(tabName: FaceApiDetailsTab): Promise<void> {
		await allureStep(
			`Open Face API details tab "${tabName}"`,

			async () => {
				await this.clickFaceApiDetailsTab(tabName);
				await this.assertFaceApiDetailsTabIsActive(tabName, false);
			},
		);
	}

	async assertFaceApiDetailsTabDownloadBarButtonIsVisible(
		button: FaceApiDetailsTabDownloadBarButton,
		isSoftExpect = true,
	): Promise<void> {
		await allureStep(
			`Check Face API details tab Download Bar button "${button}" is visible`,

			async () => {
				await this.uiExpects.assertElementIsVisible(
					this.faceApiDetailsTab.downloadBarButton(button),
					`Face API details tab Download Bar button "${button}"`,
					isSoftExpect,
				);
			},
		);
	}

	async assertTryFaceLivenessButtonIsVisible(isSoftExpect = false): Promise<void> {
		await allureStep(
			`Check "Try Face Liveness" button at Liveness Detection tab is visible`,

			async () => {
				await this.uiExpects.assertElementIsVisible(
					this.livenessDetectionTab.tryFaceLivenessButton(),
					'"Try Face Liveness" button at Liveness Detection tab',
					isSoftExpect,
				);
			},
		);
	}
}
