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
        this.app.post('/api/files/upload', {
            handler: FileController.uploadFile
        });
        this.app.get('/api/files/:fileName', {
            handler: FileController.getFile
        });
        this.app.get('/api/files/videos/:fileName', {
            handler: FileController.getVideo
        });
    }
}
