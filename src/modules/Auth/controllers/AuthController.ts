import { FastifyReply, FastifyRequest } from 'fastify';

export class AuthController
{
    public async signUp(request: FastifyRequest, reply: FastifyReply)
    {
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
