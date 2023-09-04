import { Base } from '../../../../../Shared/Domain/Entities/Base';
import { IBaseDomain } from '../../../../../Shared/Domain/Entities/IBaseDomain';
import { IUserRepPayload } from '../../Payloads/User/IUserRepPayload';
import { createHash } from '../../../../../Shared/Utils/Hash';
export class User extends Base implements IBaseDomain
{
    public username: string;
    public password: string;
    // token?: string;
    // resetPasswordToken?: string;
    // permissions: string[];
    // roles: string[];
    public verify: boolean;
    public enable: boolean;

    constructor(payload: IUserRepPayload)
    {
        super();
        this.username = payload.username;
        this.password = createHash(payload.password);
        this.verify = payload.verify;
        this.enable = payload.enable;
    }
}
