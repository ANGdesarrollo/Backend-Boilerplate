import { signUpSchema } from './Validations/AuthValidation';
import { AuthController } from '../Controller/AuthController';
import { FastifyInstance } from 'fastify';

export class AuthRoutes
{
    app: FastifyInstance;
    authController: AuthController;

    constructor(app: FastifyInstance)
    {
        this.app = app;
        this.authController = new AuthController();
    }

    public start()
    {
        this.app.post('/auth/register', {
            schema: signUpSchema,
            handler: this.authController.signUp
        });
        this.app.post('/auth/login', {
            schema: signUpSchema,
            handler: this.authController.signIn
        });
        this.app.get('/testPino', {
            handler: this.authController.testPino
        });
    }
}
