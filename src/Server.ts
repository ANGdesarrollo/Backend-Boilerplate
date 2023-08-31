import Fastify, { FastifyInstance } from 'fastify';
import { env } from './config/envConfig/envConfig';
import { AuthController } from './modules/Auth/controllers/AuthController';
import { signUpSchema } from './modules/Auth/validations/AuthValidation';


class Server
{
    private app: FastifyInstance;
    private readonly port: number;
    private AuthController: AuthController;

    public constructor()
    {
        this.app = Fastify({ logger: true });
        this.port = env.NODE_PORT;
        this.AuthController = new AuthController();
        this.initializeRoutes();
    }

    public initializeRoutes()
    {
        // TODO: ESTAS RUTAS TENDRIAN QUE ITERARSE EN UN ARRAY
        this.app.route({
            method: 'POST',
            url: '/auth',
            schema: signUpSchema,
            handler: this.AuthController.signUp
        });
    }

    public listen()
    {
        try
        {
            this.app.listen({ port: this.port })
                .then(() => console.log(`App listening on http://localhost:${this.port}`))
                .catch(error => console.log(error));
        }
        catch (err)
        {
            this.app.log.error(err);
        }
    }
}

const server = new Server();
server.listen();
