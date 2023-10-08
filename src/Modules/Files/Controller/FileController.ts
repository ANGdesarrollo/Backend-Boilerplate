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
        const contentType = mime.lookup(fileName);
        await fs.promises.access(videoPath, fs.constants.F_OK);
        void reply.type(contentType);
        const readStream = fs.createReadStream(videoPath, { highWaterMark: 64 * 1024 });
        await reply.send(readStream);
    }

    static async getVideo(request: FastifyRequest, reply: FastifyReply)
    {
        const params = request.params as IFilePayload;
        const fileName = params.fileName;
        const videoPath = `./uploads/${fileName}`;
        if (!videoPath)
        {
            await reply.status(404).send('File not found');
            return;
        }

        const stat = fs.statSync(videoPath);
        const fileSize = stat.size;
        const range = request.headers.range;

        if (range)
        {
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

            const chunksize = end - start + 1;
            const file = fs.createReadStream(videoPath, { start, end });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4'
            };

            await reply.code(206).headers(head).send(file);
        }
        else
        {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4'
            };

            await reply.code(200).headers(head).send(fs.createReadStream(videoPath));
        }
    }
}
