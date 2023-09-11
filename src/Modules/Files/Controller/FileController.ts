import { FastifyReply, FastifyRequest } from 'fastify';
import fs from 'fs';
import { pipeline } from 'stream';
import util from 'util';
import { IFilePayload } from '../Domain/Payloads/IFilePayload';

export class FileController
{
    static async uploadFile(request: FastifyRequest, reply: FastifyReply)
    {
        const data = await request.file();
        const pump = util.promisify(pipeline);
        await pump(data.file, fs.createWriteStream(`./uploads/${data.filename}`));
        await reply.status(201).send('Received');
    }

    static async getFile(request: FastifyRequest, reply: FastifyReply)
    {
        const params = request.params as IFilePayload;
        const fileName = params.fileName;
        const fileType = params.fileType.split('-');
        const fileTypeFormatted = fileType.join('/');
        const videoPath = `./src/uploads/${fileName}`;
        await fs.promises.access(videoPath, fs.constants.F_OK);
        void reply.type(fileTypeFormatted);
        const imageStream = fs.createReadStream(videoPath);
        await reply.send(imageStream);
    }
}
