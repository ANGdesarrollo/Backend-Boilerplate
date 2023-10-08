import { Base } from '../../../../../Shared/Domain/Entities/Base';
import { IUserRepPayload } from '../../Payloads/User/IUserRepPayload';
import { createHash } from '../../../../../Shared/Utils/Hash';
import { IUserDomain } from './IUserDomain';
export class User extends Base implements IUserDomain
{
    public username: string;
    public password: string;
    // token?: string;
    // resetPasswordToken?: string;
    // permissions: string[];
    public role: string;
    public verify: boolean;
    public enable: boolean;

    constructor(payload: IUserRepPayload)
    {
        super();
        this.username = payload.username;
        this.password = createHash(payload.password);
        this.verify = payload.verify;
        this.enable = payload.enable;
        this.role = payload.role;
    }
}
