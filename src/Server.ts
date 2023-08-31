import Fastify, { FastifyInstance } from 'fastify';
import { env } from './config/envConfig/envConfig';
import { AuthController } from './modules/Auth/controllers/AuthController';
import { routerAuth } from './modules/Auth/routes/Routes';

class Server
{
    private app: FastifyInstance;
    private AuthController: AuthController;

    public constructor()
    {
        // TODO: Por lo visto si pongo dentro de Fastify({ logger: true }) activa Pino, pero no pude personalizarlo. Hay que ver como se personaliza o directamente instalar Pino
        this.app = Fastify();
        this.AuthController = new AuthController();
        this.initializeRoutes();
    }

    public initializeRoutes()
    {
        routerAuth.forEach((routes) => this.app.route(routes));
    }

    public listen()
    {
        this.app.listen({ port: env.NODE_PORT })
            .then(() => console.log(`🚀 Server is running at ${env.NODE_URL_API}`))
            .catch(error => console.log(error));
    }
}

const server = new Server();
server.listen();
