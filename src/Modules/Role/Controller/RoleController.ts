import { FastifyReply, FastifyRequest } from 'fastify';
import {IRoleRepPayload} from "../Domain/Payloads/IRoleRepPayload";
import {CreateRoleUseCase} from "../Domain/UseCases/CreateRoleUseCase";

export class RoleController
{
    static async create(request: FastifyRequest, reply: FastifyReply)
    {
        const data = request.body as IRoleRepPayload;
        const useCase = new CreateRoleUseCase();
        const roleSaved = await useCase.handle(data);
        await reply.status(201).send(roleSaved);
    }
    // static async signUp(request: FastifyRequest, reply: FastifyReply)
    // {
    //     const data = request.body as IUserRepPayload;
    //     const createUserUseCase = new SignUpUserUseCase();
    //     const userSaved = await createUserUseCase.handle(data);
    //     await reply.status(201).send(new UserTransformer(userSaved));
    // }
}
