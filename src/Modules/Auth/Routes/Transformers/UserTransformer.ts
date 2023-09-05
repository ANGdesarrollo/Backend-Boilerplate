import { IUserDomain } from '../../Domain/Entities/User/IUserDomain';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';

dayjs.extend(utc);
export class UserTransformer
{
    public username: string;
    // token?: string;
    // resetPasswordToken?: string;
    // permissions: string[];
    // roles: string[];
    public verify: boolean;
    public enable: boolean;
    public createdAt: number;
    public updatedAt: number;

    constructor(payload: IUserDomain)
    {
        this.username = payload.username;
        this.verify = payload.verify;
        this.enable = payload.enable;
        this.createdAt = dayjs(payload.createdAt).utc().unix();
        this.updatedAt = dayjs(payload.updatedAt).utc().unix();
    }
}
