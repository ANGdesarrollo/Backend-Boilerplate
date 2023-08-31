import { FastifyReply, FastifyRequest } from 'fastify';

export class AuthController
{
    public async signUp(request: FastifyRequest, reply: FastifyReply)
    {
        return 'hello word';
    }
}
