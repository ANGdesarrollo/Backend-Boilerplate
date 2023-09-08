import { SignUpUserUseCase } from '../Domain/UseCases/SignUpUserUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { IUserRepPayload } from '../Domain/Payloads/User/IUserRepPayload';
import { UserTransformer } from '../Routes/Transformers/UserTransformer';
import { SignInUserUseCase } from '../Domain/UseCases/SignInUserUseCase';
import jwt from 'jsonwebtoken';
import { env } from '../../../Config/EnvConfig/envConfig';
import { JWToken } from '../Domain/Models/JWToken';

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
        const expiresIn = 10 * 60;

        const accessToken = jwt.sign({
            expiresIn,
            data: {
                username: loginUser.getId(),
                expiresIn
            }
        }, env.NODE_TOKEN_SECRET);
        void reply.setCookie('accessToken', accessToken, {
            signed: true,
            httpOnly: true,
            maxAge: expiresIn
        });

        await reply.status(201).send(new UserTransformer(loginUser));
    }

    static async testPino(request: FastifyRequest, reply: FastifyReply)
    {
        reply.log.info('Esto es un mensaje de nivel info');
        reply.log.warn('Esto es un mensaje de nivel warn');
        reply.log.error('Esto es un mensaje de nivel error');
        reply.log.fatal('Esto es un mensaje de nivel fatal');
    }

    static async refreshCookie(request: FastifyRequest, reply: FastifyReply)
    {
        const expiresIn = 10 * 60;
        const cookie = reply.unsignCookie(request.cookies.accessToken);
        const token = JWToken.verifyJWT(cookie.value);
        const accessToken = JWToken.setJWT(expiresIn, token.data.username);


        void reply.clearCookie('accessToken', {
            signed: true
        });

        void reply.setCookie('accessToken', accessToken, {
            signed: true,
            httpOnly: true,
            maxAge: expiresIn
        });

        await reply.send(accessToken);
    }
}
