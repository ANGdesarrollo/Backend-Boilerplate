import Fastify, { FastifyInstance } from 'fastify';
import { env } from './Config/EnvConfig/envConfig';
import { AuthRoutes } from './Modules/Auth/Routes/AuthRouter';
import logger from './Config/PinoConfig/pinoConfig';
import { mongooseConnection } from './Shared/Infraestructure/Database/MongooseConnection';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import fastifyRateLimit from '@fastify/rate-limit';
import { fastifyJwt } from '@fastify/jwt';

export class Server
{
    app: FastifyInstance;

    public constructor()
    {
        this.app = Fastify(logger);
    }
    public async initializePlugins()
    {
        try
        {
            await this.app.register(cors);
            await this.app.register(helmet);
            await this.app.register(fastifyJwt, { secret: env.NODE_TOKEN_SECRET });
            await this.app.register(fastifyRateLimit, { max: 30, timeWindow: '1 minute' });
        }
        catch (error)
        {
            throw new Error(error as string);
        }
        // TODO: Investigar las configuracioens de cors. https://github.com/fastify/fastify-cors
        // TODO: Investigar las configuraciones de helmet. https://github.com/fastify/fastify-helmet
        // TODO: Investigar como funciona el JWT token para setear una cookie cuando se loguea un usuario https://github.com/fastify/fastify-jwt
        // TODO: Interesante plugin que viene con standard de autorizacion OAUTH2, investigar. https://github.com/fastify/fastify-oauth2
        // https://github.com/fastify/fastify-rate-limit
    }

    public initializeRoutes()
    {
        new AuthRoutes(this.app).start();
    }

    // TODO: Esta es la mejor manera de inicializar la DB? Investigar.
    public async initializeConnectionDB()
    {
        try
        {
            await mongooseConnection();
        }
        catch (error)
        {
            throw new Error(error as string);
        }
    }

    public async listen()
    {
        try
        {
            await this.app.listen({ port: env.NODE_PORT });
        }
        catch (error)
        {
            throw new Error(error as string);
        }
    }
}
