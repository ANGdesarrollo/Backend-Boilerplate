import Fastify, { FastifyInstance } from 'fastify';
import { env } from './config/envConfig/envConfig';
import { AuthController } from './modules/Auth/controllers/AuthController';
import { routerAuth } from './modules/Auth/routes/Routes';
import logger from './config/pinoConfig/pinoConfig';

class Server
{
    private app: FastifyInstance;
    private AuthController: AuthController;

    public constructor()
    {
        this.app = Fastify(logger);
        this.AuthController = new AuthController();

        this.initializeRoutes();
    }

    public initializeRoutes()
    {
        routerAuth.forEach((routes) => this.app.route(routes));
    }

    public listen()
    {
        this.app
            .listen({ port: env.NODE_PORT })
            .then(() =>
            {
                this.app.log.info(`🚀 Server is running at ${env.NODE_URL_API}`);
            })
            .catch((error) => console.log(error));
    }
}
const server = new Server();
server.listen();
