module.exports = {
    apps: [
        {
            name: 'boilerplate-backend',
            script: 'dist/src/InitServer.js',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                DOTENV_CONFIG_PATH: './.env',
            }
        },
    ],
};
