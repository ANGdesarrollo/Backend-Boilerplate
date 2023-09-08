import { IUserRepPayload } from '../Payloads/User/IUserRepPayload';
import { IUserDomain } from '../Entities/User/IUserDomain';

export interface ISignInUserUseCase
{
    handle(payload: IUserRepPayload): Promise<IUserDomain>
}
