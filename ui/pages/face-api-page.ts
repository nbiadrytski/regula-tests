import { BasePage } from './base-page';
import { Locator, Page } from '@playwright/test';

export enum FaceApiTab {
	LivenessDetection = 'Liveness detection',
	FaceDetection = 'Face detection',
	FaceMatching = 'Face matching',
	FaceImageQuality = 'Face image quality',
}

export enum FaceApiDetailsTab {
	Results = 'Results',
	Request = 'Request',
	Response = 'Response',
}

export enum FaceApiDetailsTabDownloadBarButton {
	Retry = 'Retry',
	Copy = 'Copy to Clipboard',
	DownloadJson = 'Download .json',
}

export class FaceApiPage extends BasePage {
	constructor(override readonly page: Page) {
		super(page);
	}

	protected readonly faceApiTab = {
		byTextName: (name: FaceApiTab): Locator => this.page.locator(`nav >> text="${name}"`),
	};

	protected readonly livenessDetectionTab = {
		tryFaceLivenessButton: () => this.page.locator('[data-test="liveness-try-button"]'),
	};

	protected readonly faceApiDetailsTab = {
		byName: (name: FaceApiDetailsTab): Locator => this.page.getByRole('tab', { name: name }),
		downloadBarButton: (name: FaceApiDetailsTabDownloadBarButton): Locator =>
			this.page.getByRole('paragraph').filter({ hasText: name }).getByRole('img'),
	};

	protected readonly headings = {
		faceSdkWebApi: () => this.page.getByRole('heading', { name: 'Regula Face SDK Web API' }),
	};

	async navigateToPage(): Promise<void> {
		await this.pageActions.navigateTo('/', { waitUntil: 'domcontentloaded' });
	}

	async clickFaceApiTab(tabName: FaceApiTab): Promise<void> {
		await this.elementActions.clickElement(
			this.faceApiTab.byTextName(tabName),
			`Face API tab "${tabName}"`,
		);
	}

	async clickFaceApiDetailsTab(tabName: FaceApiDetailsTab): Promise<void> {
		await this.elementActions.clickElement(
			this.faceApiDetailsTab.byName(tabName),
			`Face API details tab "${tabName}"`,
		);
	}
}
