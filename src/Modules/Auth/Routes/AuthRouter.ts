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
        this.app.post('/api/auth/register', {
            schema: signUpSchema,
            handler: AuthController.signUp
        });
        this.app.post('/api/auth/login', {
            schema: signUpSchema,
            handler: AuthController.signIn
        });
        this.app.get('/api/auth/refresh-token', {
            handler: AuthController.refreshCookie
        });
        this.app.post('/api/auth/forgot-password', {
            handler: AuthController.forgotPassword,
            schema: forgotPasswordSchema
        });
        this.app.put('/api/auth/reset-password', {
            handler: AuthController.resetPassword,
            schema: resetPasswordSchema
        });
        this.app.get('/api/auth/me', {
            handler: AuthController.getMe
        });
        this.app.get('/api/testPino', {
            handler: AuthController.testPino
        });
    }
}
