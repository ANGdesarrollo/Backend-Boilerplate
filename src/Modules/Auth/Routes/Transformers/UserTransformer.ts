import { IUserDomain } from '../../Domain/Entities/User/IUserDomain';


export class UserTransformer
{
    public username: string;
    // token?: string;
    // resetPasswordToken?: string;
    // permissions: string[];
    // roles: string[];
    public verify: boolean;
    public enable: boolean;

    constructor(payload: IUserDomain)
    {
        this.username = payload.username;
        this.verify = payload.verify;
        this.enable = payload.enable;
    }
}
