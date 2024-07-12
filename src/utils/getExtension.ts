export const getFileExtension = (fileName: string) => {
	const parts = fileName.split('.');
	return parts[parts.length - 1];
};
