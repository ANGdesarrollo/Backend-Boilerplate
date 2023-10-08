import {Base} from "../../../../Shared/Domain/Entities/Base";
import {IRoleDomain} from "./IRoleDomain";
import {IRoleRepPayload} from "../Payloads/IRoleRepPayload";

export class Role extends Base implements IRoleDomain
{
   public role: string;

    constructor(payload: IRoleRepPayload)
    {
        super();
        this.role = payload.role;
    }
}
