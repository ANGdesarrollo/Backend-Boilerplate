import { signUpSchema } from './validations/AuthValidation';
import { AuthController } from '../controllers/AuthController';
import { IRouter } from '../../../shared/routes/IRoutes';

const authController: AuthController = new AuthController();
export const routerAuth: IRouter[] = [
    {
        method: 'POST',
        url: '/auth',
        schema: signUpSchema,
        handler: authController.signUp
    }
];
