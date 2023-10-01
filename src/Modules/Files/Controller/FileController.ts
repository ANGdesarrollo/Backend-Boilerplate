import { FastifyReply, FastifyRequest } from 'fastify';
import fs from 'fs';
import { IFilePayload } from '../Domain/Payloads/IFilePayload';
import { UploadFileUseCase } from '../Domain/UseCases/UploadFileUseCase';
import mime from 'mime-types';

export class FileController
{
    static async uploadFile(request: FastifyRequest, reply: FastifyReply)
    {
        const data = await request.file();
        const useCase = new UploadFileUseCase();
        await useCase.handle(data);
        await reply.status(201).send({
            status: true
        });
    }

    static async getFile(request: FastifyRequest, reply: FastifyReply)
    {
        const params = request.params as IFilePayload;
        const fileName = params.fileName;
        const videoPath = `./uploads/${fileName}`;
        const contentType = mime.lookup(fileName)
        await fs.promises.access(videoPath, fs.constants.F_OK);
        void reply.type(contentType);
        const readStream = fs.createReadStream(videoPath, { highWaterMark: 64 * 1024 });
        await reply.send(readStream);
    }
}
