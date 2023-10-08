import { FastifyReply, FastifyRequest, FastifySchema } from 'fastify';

// TODO: Asumo que esto es momentaneo y despues se va a tipar bien la request segun cada endpoint, lo mismo para los schemas.

// CAMBIO: Schema modo opcional para testear.

export interface IRouter {
    method: HttpMethod;
    url: string;
    schema?: FastifySchema
    handler: (request: FastifyRequest, reply: FastifyReply) => Promise<any>;
}

type HttpMethod = 'POST' | 'PUT' | 'GET' | 'DELETE';
