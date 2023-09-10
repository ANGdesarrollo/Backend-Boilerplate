import { SignUpUserUseCase } from '../Domain/UseCases/SignUpUserUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { IUserRepPayload } from '../Domain/Payloads/User/IUserRepPayload';
import { UserTransformer } from '../Routes/Transformers/UserTransformer';
import { SignInUserUseCase } from '../Domain/UseCases/SignInUserUseCase';
import { JWToken } from '../Domain/Models/JWToken';
import { Cookie } from '../Domain/Models/Cookie';
import { Email } from '../../../Shared/Domain/Models/Email';
import { templateForgotEmail } from '../../../Shared/Utils/templates';
import { IUserForgotPasswordPayload } from '../Domain/Payloads/User/IUserForgotPasswordPayload';
import { IUserResetPasswordPayload } from '../Domain/Payloads/User/IUserResetPasswordPayload';
import { ResetPasswordUserUseCase } from '../Domain/UseCases/ResetPasswordUserUseCase';
import { GetMeUseCase } from '../Domain/UseCases/GetMeUseCase';

export class AuthController
{
    static async signUp(request: FastifyRequest, reply: FastifyReply)
    {
        const data = request.body as IUserRepPayload;
        const createUserUseCase = new SignUpUserUseCase();
        const userSaved = await createUserUseCase.handle(data);
        await reply.status(201).send(new UserTransformer(userSaved));
    }

    static async signIn(request: FastifyRequest, reply: FastifyReply)
    {
        const data = request.body as IUserRepPayload;
        const loginUserUseCase = new SignInUserUseCase();
        const loginUser = await loginUserUseCase.handle(data);
        const accessToken = JWToken.setJWT(loginUser.username);
        Cookie.generateCookie(reply, 'accessToken', accessToken);

        await reply.status(201).send(new UserTransformer(loginUser));
    }

    static async forgotPassword(request: FastifyRequest, reply: FastifyReply)
    {
        const data = request.body as IUserForgotPasswordPayload;
        const recoverToken = JWToken.setJWT(data.username);
        const link = `https://ang-dev.com/${recoverToken}`;
        await Email.createTransport(templateForgotEmail('alexisgraff123@gmail.com', link));

        await reply.status(201).send({
            status: true
        });
    }

    static async resetPassword(request: FastifyRequest, reply: FastifyReply)
    {
        const body = request.body as IUserResetPasswordPayload;
        const useCase = new ResetPasswordUserUseCase();
        const user = await useCase.handle(body);

        await reply.status(201).send(user);
    }

    static async refreshCookie(request: FastifyRequest, reply: FastifyReply)
    {
        const cookie = reply.unsignCookie(request.cookies.accessToken);
        const token = JWToken.verifyJWT(cookie.value);
        const accessToken = JWToken.setJWT(token.data.username);
        Cookie.removeCookie(reply, 'accessToken');
        Cookie.generateCookie(reply, 'accessToken', accessToken);

        await reply.status(200).send({
            status: true
        });
    }

    static async getMe(request: FastifyRequest, reply: FastifyReply)
    {
        const cookie = reply.unsignCookie(request.cookies.accessToken);
        const token = JWToken.verifyJWT(cookie.value);
        const username = token.data.username;
        const useCase = new GetMeUseCase();
        const user = await useCase.handle(username);

        await reply.status(200).send(new UserTransformer(user));
    }

    static async testPino(request: FastifyRequest, reply: FastifyReply)
    {
        reply.log.info('Esto es un mensaje de nivel info');
        reply.log.warn('Esto es un mensaje de nivel warn');
        reply.log.error('Esto es un mensaje de nivel error');
        reply.log.fatal('Esto es un mensaje de nivel fatal');
    }
}
