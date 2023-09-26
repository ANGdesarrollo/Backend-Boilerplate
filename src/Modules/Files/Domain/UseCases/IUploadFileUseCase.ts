import { MultipartFile } from '@fastify/multipart';

export interface IUploadFileUseCase {
    handle(payload: MultipartFile): void;
}
