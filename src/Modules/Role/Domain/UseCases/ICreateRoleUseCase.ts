import {IRoleRepPayload} from "../Payloads/IRoleRepPayload";
import {IRoleDomain} from "../Entities/IRoleDomain";

export interface ICreateRoleUseCase
{
    handle(payload: IRoleRepPayload): Promise<IRoleDomain>
}
