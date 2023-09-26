export const multipartConfig = {
    limits: {
        fileSize: 500 * 1024 * 1024,
        files: 1,
        headerPairs: 2000
    },
    maxRequestTime: 5000
};
