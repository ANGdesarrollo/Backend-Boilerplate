import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserUseCase } from '../Domain/useCases/CreateUserUseCase';
import { IUserRepPayload } from '../Domain/Payloads/User/IUserRepPayload';
import { UserTransformer } from '../Routes/Transformers/UserTransformer';

export class AuthController
{
    public async signUp(request: FastifyRequest, reply: FastifyReply)
    {
        const data = request.body as IUserRepPayload;
        data.enable = true;
        data.verify = false;
        const createUserUseCase = new CreateUserUseCase();
        const userSaved = await createUserUseCase.handle(data);
        const transformUser = new UserTransformer(userSaved);

        await reply.send(transformUser);
    }

    public async testPino(request: FastifyRequest, reply: FastifyReply)
    {
        reply.log.info('Esto es un mensaje de nivel info');
        reply.log.warn('Esto es un mensaje de nivel warn');
        reply.log.error('Esto es un mensaje de nivel error');
        reply.log.fatal('Esto es un mensaje de nivel fatal');
    }
}
