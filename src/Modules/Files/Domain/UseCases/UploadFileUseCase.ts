import { MultipartFile } from '@fastify/multipart';
import util from 'util';
import { pipeline } from 'stream';
import fs from 'fs';
import { IUploadFileUseCase } from './IUploadFileUseCase';

export class UploadFileUseCase implements IUploadFileUseCase
{
    async handle(payload: MultipartFile)
    {
        const uploadFolder = './uploads';

        if (!fs.existsSync(uploadFolder))
        {
            fs.mkdirSync(uploadFolder);
        }

        const path = `./uploads/${payload.filename}`;

        const pump = util.promisify(pipeline);
        await pump(payload.file, fs.createWriteStream(path));
    }
}
