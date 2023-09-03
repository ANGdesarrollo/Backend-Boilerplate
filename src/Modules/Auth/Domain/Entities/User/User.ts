import { IUserDomain } from './IUserDomain';
import { Base } from '../../../../../Shared/Domain/Entities/Base';
import { IBaseDomain } from '../../../../../Shared/Domain/Entities/IBaseDomain';
import { IUserRepPayload } from '../../Payloads/User/IUserRepPayload';

export class User extends Base implements IBaseDomain
{
    private username: string;
    private email: string;
    private password: string;
    // token?: string;
    // resetPasswordToken?: string;
    // permissions: string[];
    // roles: string[];
    private verify: boolean;
    private enable: boolean;

    constructor(payload: IUserRepPayload)
    {
        super();
        this.username = payload.username;
        this.email = payload.email;
        this.password = payload.password;
        this.verify = payload.verify;
        this.enable = payload.enable;
    }


    get getUsername(): string
    {
        return this.username;
    }

    get getEmail(): string
    {
        return this.email;
    }

    get getPassword(): string
    {
        return this.password;
    }

    get getVerify(): boolean
    {
        return this.verify;
    }

    get getEnable(): boolean
    {
        return this.enable;
    }
}
