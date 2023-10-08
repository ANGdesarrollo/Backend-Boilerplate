export const logger = {
    level: 'info',
    transport: {
        targets: [
            {
                target: 'pino/file',
                level: 'info',
                options: {
                    destination: 'log.log',
                    translateTime: 'HH:MM:ss Z',
                    ignore: 'pid,hostname'
                }
            },
            {
                target: 'pino/file',
                level: 'error',
                options: {
                    destination: 'error.log',
                    translateTime: 'HH:MM:ss Z',
                    ignore: 'pid,hostname'
                }
            },
            {
                level: 'info',
                target: 'pino-pretty',
                options: {
                    translateTime: 'HH:MM:ss Z',
                    ignore: 'pid,hostname'
                }
            }
        ]
    }
};
