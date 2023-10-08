import { IUserDomain } from '../Entities/User/IUserDomain';

export interface IGetMeUseCase {
    handle(payload: string): Promise<IUserDomain>
}
