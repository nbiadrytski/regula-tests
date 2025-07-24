import { FaceApiClient } from '../clients/face-api-client';
import { BaseExpects } from '../../common/base-expects';

export class FaceApiClientSteps extends FaceApiClient {
	readonly baseExpects: BaseExpects;

	constructor() {
		super();
		this.baseExpects = new BaseExpects();
	}
}
