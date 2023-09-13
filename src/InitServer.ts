import { Server } from './Server';

void (async() =>
{
    const server = new Server();
    await server.initializeConnectionDB();
    await server.initializePlugins();
    server.initializeRoutes();
    await server.listen();

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    process.once('SIGINT', server.close);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    process.once('SIGTERM', server.close);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    process.once('SIGUSR2', server.close);
})();
