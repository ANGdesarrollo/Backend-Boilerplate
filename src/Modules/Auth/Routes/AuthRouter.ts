import {
    forgotPasswordSchema,
    resetPasswordSchema,
    signUpSchema
} from './Validations/AuthValidation';
import { AuthController } from '../Controller/AuthController';
import { FastifyInstance } from 'fastify';

export class AuthRoutes
{
    private app: FastifyInstance;

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
        this.app.get('/auth/refresh-token', {
            handler: AuthController.refreshCookie
        });
        this.app.post('/auth/forgot-password', {
            handler: AuthController.forgotPassword,
            schema: forgotPasswordSchema
        });
        this.app.put('/auth/reset-password', {
            handler: AuthController.resetPassword,
            schema: resetPasswordSchema
        });
        this.app.get('/auth/me', {
            handler: AuthController.getMe
        });
        this.app.get('/testPino', {
            handler: AuthController.testPino
        });
    }
}
