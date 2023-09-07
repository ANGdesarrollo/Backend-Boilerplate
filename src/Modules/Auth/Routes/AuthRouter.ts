import { signUpSchema } from './Validations/AuthValidation';
import { AuthController } from '../Controller/AuthController';
import { FastifyInstance } from 'fastify';

export class AuthRoutes
{
    app: FastifyInstance;

    constructor(app: FastifyInstance)
    {
        this.app = app;
    }

    public start()
    {
        this.app.post('/auth/register', {
            schema: signUpSchema,
            handler: AuthController.signUp
        });
        this.app.post('/auth/login', {
            schema: signUpSchema,
            handler: AuthController.signIn
        });
        this.app.get('/testPino', {
            handler: AuthController.testPino
        });
        this.app.get('/auth', {
            handler: AuthController.testDecode
        });
    }
}
