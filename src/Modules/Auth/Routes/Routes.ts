import { signUpSchema } from './Validations/AuthValidation';
import { AuthController } from '../Controller/AuthController';
import { IRouter } from '../../../Shared/Routes/IRoutes';

const authController: AuthController = new AuthController();
export const routerAuth: IRouter[] = [
    {
        method: 'POST',
        url: '/auth/register',
        schema: signUpSchema,
        handler: authController.signUp
    },
    {
        method: 'POST',
        url: '/auth/login',
        schema: signUpSchema,
        handler: authController.signIn
    },
    {
        method: 'GET',
        url: '/testPino',
        handler: authController.testPino
    }
];
