import Fastify, { FastifyInstance } from 'fastify';
import { env } from './Config/EnvConfig/envConfig';
import { AuthRoutes } from './Modules/Auth/Routes/AuthRouter';
import logger from './Config/PinoConfig/pinoConfig';
import { mongooseConnection } from './Shared/Infraestructure/Database/MongooseConnection';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import fastifyRateLimit from '@fastify/rate-limit';
import fastifyCookie from '@fastify/cookie';
import multipart from '@fastify/multipart';
import { FilesRouter } from './Modules/Files/Router/FilesRouter';
import * as path from 'path';
import fastifyStatic from '@fastify/static';

export class Server
{
    app: FastifyInstance;

    public constructor()
    {
        this.app = Fastify(logger);
    }
    public async initializePlugins(): Promise<void>
    {
        try
        {
            await this.app.register(multipart);
            await this.app.register(cors, {
                origin: 'http://127.0.0.1:5500',
                credentials: true
            });
            await this.app.register(helmet);
            await this.app.register(fastifyRateLimit, { max: 30, timeWindow: '1 minute' });
            await this.app.register(fastifyCookie, {
                secret: env.NODE_TOKEN_SECRET,
                hook: 'onRequest',
                parseOptions: {}
            });
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

    public initializeRoutes(): void
    {
        new AuthRoutes(this.app).start();
        new FilesRouter(this.app).start();
    }

    // TODO: Esta es la mejor manera de inicializar la DB? Investigar.
    public async initializeConnectionDB(): Promise<void>
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

    public async listen(): Promise<void>
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
