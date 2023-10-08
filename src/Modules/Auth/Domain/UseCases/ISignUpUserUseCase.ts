import { IUserRepPayload } from '../Payloads/User/IUserRepPayload';
import { IUserDomain } from '../Entities/User/IUserDomain';

export interface ISignUpUserUseCase
{
    handle(payload: IUserRepPayload): Promise<IUserDomain>
}
