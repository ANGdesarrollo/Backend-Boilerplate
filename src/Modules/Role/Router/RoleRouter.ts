import { FastifyInstance } from 'fastify';
import { RoleController } from '../Controller/RoleController';
export class RoleRouter
{
    private app: FastifyInstance;

    constructor(app: FastifyInstance)
    {
        this.app = app;
    }

    public start()
    {
        this.app.post('/api/role/create', {
            handler: RoleController.create
        });
    }
}
