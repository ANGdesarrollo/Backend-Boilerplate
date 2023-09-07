import { Server } from './Server';

void(async() =>
{
    const server = new Server();
    await server.initializeConnectionDB();
    await server.initializePlugins();
    server.initializeRoutes();
    await server.listen();
})();
