import { FastifyReply, FastifyRequest } from 'fastify';
import fs from 'fs';
import { IFilePayload } from '../Domain/Payloads/IFilePayload';
import { UploadFileUseCase } from '../Domain/UseCases/UploadFileUseCase';

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
        const fileType = params.fileType.split('-');
        const fileTypeFormatted = fileType.join('/');
        const videoPath = `./uploads/${fileName}`;
        await fs.promises.access(videoPath, fs.constants.F_OK);
        void reply.type(fileTypeFormatted);
        const imageStream = fs.createReadStream(videoPath);
        await reply.send(imageStream);
    }
}
