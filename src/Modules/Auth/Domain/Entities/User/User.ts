import {IUserDomain} from "./IUserDomain";
import {Base} from "../../../../../Shared/Domain/Entities/Base";
import {IBaseDomain} from "../../../../../Shared/Domain/Entities/IBaseDomain";

export class User extends Base implements IBaseDomain {
    username: string;
    email: string;
    password: string;
    // token?: string;
    // resetPasswordToken?: string;
    // permissions: string[];
    // roles: string[];
    verify: boolean;
    enable: boolean;

    constructor(payload: IUserRepPayload)
    {
        super();
    }
}
