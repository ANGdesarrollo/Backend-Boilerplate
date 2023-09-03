import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserUseCase } from '../Domain/useCases/CreateUserUseCase';
import { User } from '../Domain/Entities/User/User';
import { IUserRepPayload } from '../Domain/Payloads/User/IUserRepPayload';

export class AuthController
{
    public async signUp(request: FastifyRequest, reply: FastifyReply)
    {
        const body = request.body as IUserRepPayload;
        const saveUserUseCase = new CreateUserUseCase();
        const userSaved = await saveUserUseCase.handle(body);

        await reply.send(userSaved);
    }

    public async testPino(request: FastifyRequest, reply: FastifyReply)
    {
        reply.log.info('Esto es un mensaje de nivel info');
        reply.log.warn('Esto es un mensaje de nivel warn');
        reply.log.error('Esto es un mensaje de nivel error');
        reply.log.fatal('Esto es un mensaje de nivel fatal');
    }
}
