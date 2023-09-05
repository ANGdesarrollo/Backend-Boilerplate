import Fastify, { FastifyInstance } from 'fastify';
import { env } from './Config/EnvConfig/envConfig';
import { routerAuth } from './Modules/Auth/Routes/Routes';
import logger from './Config/PinoConfig/pinoConfig';
import { mongooseConnection } from './Shared/Infraestructure/Database/MongooseConnection';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import fastifyJwt from '@fastify/jwt';
import fastifyRateLimit from '@fastify/rate-limit';

class Server
{
    private app: FastifyInstance;

    public constructor()
    {
        this.app = Fastify(logger);
        this.initializeRoutes();
    }
    public async initializePlugins()
    {
        // TODO: Investigar las configuracioens de cors. https://github.com/fastify/fastify-cors
        await this.app.register(cors);
        // TODO: Investigar las configuraciones de helmet. https://github.com/fastify/fastify-helmet
        await this.app.register(helmet);
        // TODO: Investigar como funciona el JWT token para setear una cookie cuando se loguea un usuario https://github.com/fastify/fastify-jwt
        // TODO: Interesante plugin que viene con standard de autorizacion OAUTH2, investigar. https://github.com/fastify/fastify-oauth2
        await this.app.register(fastifyJwt, { secret: 'clave secreta que viene del env' });
        // https://github.com/fastify/fastify-rate-limit
        await this.app.register(fastifyRateLimit, { max: 30, timeWindow: '1 minute' });
    }

    public initializeRoutes()
    {
        routerAuth.forEach((routes) => this.app.route(routes));
    }

    // TODO: Esta es la mejor manera de inicializar la DB? Investigar.
    public initializeConnectionDB()
    {
        mongooseConnection()
            .then(() => this.app.log.info('Connection to Database successfully created'))
            .catch((error) => this.app.log.error(error));
    }

    public listen()
    {
        this.app
            .listen({ port: env.NODE_PORT })
            .then(() =>
            {
                this.app.log.info(`🚀 Server is running at ${env.NODE_URL_API}`);
            })
            .catch((error) => this.app.log.error(error));
    }
}
const server = new Server();
server.listen();
server.initializeConnectionDB();
// TODO: Investigar como llamar a los plugins que son asincronos aca sin usar then, como hacen en node experience?
server.initializePlugins().then(() => '').catch(() => '');
