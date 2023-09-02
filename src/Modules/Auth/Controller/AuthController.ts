import { FastifyReply, FastifyRequest } from 'fastify';
import {CreateUserUseCase} from "../Domain/useCases/CreateUserUseCase";
import {User} from "../Domain/Entities/User/User";

export class AuthController
{
    public async signUp(request: FastifyRequest, reply: FastifyReply)
    {
        const userData = new User(request.body);
        const saveUserUseCase = new CreateUserUseCase();
        return await saveUserUseCase.handle(userData);

        return 'hello word';
    }

    public async testPino(request: FastifyRequest, reply: FastifyReply)
    {
        reply.log.info('Esto es un mensaje de nivel info');
        reply.log.warn('Esto es un mensaje de nivel warn');
        reply.log.error('Esto es un mensaje de nivel error');
        reply.log.fatal('Esto es un mensaje de nivel fatal');
    }
}
