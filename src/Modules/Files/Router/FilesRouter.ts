import { FastifyInstance } from 'fastify';
import { FileController } from '../Controller/FileController';

export class FilesRouter
{
    private app: FastifyInstance;

    constructor(app: FastifyInstance)
    {
        this.app = app;
    }

    public start()
    {
        this.app.post('/files/upload', {
            handler: FileController.uploadFile
        });
        this.app.get('/files/:fileName/:fileType', {
            handler: FileController.getFile
        });
    }
}
