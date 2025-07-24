import { Page } from '@playwright/test';

import { PageActions } from '../utils/page/page-actions';
import { ElementActions } from '../utils/element/element-actions';
import { BaseExpects } from '../../common/base-expects';
import { UiExpects } from '../ui-expects';

export abstract class BasePage {
	readonly uiExpects: UiExpects;
	readonly baseExpects: BaseExpects;
	readonly pageActions: PageActions;
	readonly elementActions: ElementActions;

	protected constructor(readonly page: Page) {
		this.uiExpects = new UiExpects(page);
		this.baseExpects = new BaseExpects();
		this.pageActions = new PageActions(page);
		this.elementActions = new ElementActions(page);
	}
}
