import { IBaseRepository } from '../../../../Shared/Infraestructure/Repository/IBaseRepository';
import { IUserDomain } from '../../Domain/Entities/User/IUserDomain';
import { IUserRepPayload } from '../../Domain/Payloads/User/IUserRepPayload';

// Aca se pueden definir metodos.
export interface IUserRepository extends IBaseRepository<IUserDomain> {}
