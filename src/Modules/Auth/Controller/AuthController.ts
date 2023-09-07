import { SignUpUserUseCase } from '../Domain/useCases/SignUpUserUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { IUserRepPayload } from '../Domain/Payloads/User/IUserRepPayload';
import { UserTransformer } from '../Routes/Transformers/UserTransformer';
import { SignInUserUseCase } from '../Domain/useCases/SignInUserUseCase';

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
        const jwt = await reply.jwtSign({ id: loginUser.getId() });
        await reply.setCookie('accessToken', jwt, {
            signed: true,
            httpOnly: true
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

    static async testDecode(request: FastifyRequest, reply: FastifyReply)
    {
        // const cookie = request.cookies.accessToken;
        // const unsigned = reply.unsignCookie(cookie);
        await reply.send('hola');
    }
}
