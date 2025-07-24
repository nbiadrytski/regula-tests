export enum SERVICE_NAME {
	FACE_API = 'faceApi',
}

export const serviceUrl = (serviceName: SERVICE_NAME): SERVICE_NAME => {
	const urls: { [key: string]: string } = {
		faceApi: 'https://faceapi.regulaforensics.com',
	};
	return urls[serviceName] as SERVICE_NAME;
};

export const requestUrl = (serviceName: SERVICE_NAME, endpoint: string): string => {
	return `${serviceUrl(serviceName)}/${endpoint}`;
};
