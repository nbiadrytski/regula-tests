export interface DetectFacePayload {
	processParam: {
		onlyCentralFace: boolean;
		outputImageParams: {
			crop: {
				type: number;
				size: [number, number];
			};
		};
		attributes: {
			config: Array<{
				name: FaceAttributeName;
			}>;
		};
	};
	image: string; // Base64 encoded image string
}

export type FaceAttributeName =
	| 'Age'
	| 'EyeRight'
	| 'EyeLeft'
	| 'Emotion'
	| 'Smile'
	| 'Glasses'
	| 'HeadCovering'
	| 'ForeheadCovering'
	| 'Mouth'
	| 'MedicalMask'
	| 'Occlusion'
	| 'StrongMakeup'
	| 'Headphones';
