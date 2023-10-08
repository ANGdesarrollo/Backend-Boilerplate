import { IUserRepPayload } from '../Payloads/User/IUserRepPayload';
import { IUserDomain } from '../Entities/User/IUserDomain';
import { IUserResetPasswordPayload } from '../Payloads/User/IUserResetPasswordPayload';

export interface IResetPasswordUserUseCase
{
    handle(payload: IUserResetPasswordPayload): Promise<IUserDomain>
}
