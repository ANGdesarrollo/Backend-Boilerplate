import Fastify, { FastifyInstance } from 'fastify';
import { env } from './Config/EnvConfig/envConfig';
import { routerAuth } from './Modules/Auth/Routes/Routes';
import logger from './Config/PinoConfig/pinoConfig';
import {mongooseConnection} from "./Shared/Infraestructure/Database/MongooseConnection";

class Server
{
    private app: FastifyInstance;

    public constructor()
    {
        this.app = Fastify(logger);
        this.initializeRoutes();
        this.initializeConnectionDB();
    }

    public initializeRoutes()
    {
        routerAuth.forEach((routes) => this.app.route(routes));
    }

    // TODO: Esta es la mejor manera de inicializar la DB? Investigar.
    public initializeConnectionDB()
    {
        mongooseConnection()
            .then(() => this.app.log.info("Connection to Database successfully created"))
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
            .catch((error) => console.log(error));
    }
}
const server = new Server();
server.listen();
