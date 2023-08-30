import Fastify, {FastifyInstance} from 'fastify';
import {env} from "./config/envConfig/envConfig";

class Server
{
    private app: FastifyInstance;
    private readonly port: number;

    public constructor() {
        this.app = Fastify({logger: true});
        this.port = env.NODE_PORT
    }

    public initialiceRoutes() {

    }

    public async listen() {
        try {
            await this.app.listen({port: this.port})
        }
        catch (err) {
            this.app.log.error(err);
        }

    }
}

const server = new Server();
server.listen();
