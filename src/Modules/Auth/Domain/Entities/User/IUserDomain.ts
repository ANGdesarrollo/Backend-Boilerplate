import { IBaseDomain } from '../../../../../Shared/Domain/Entities/IBaseDomain';
import { IUserRepPayload } from '../../Payloads/User/IUserRepPayload';

// Esta interfaz se utiliza para definir metodos de clases
export interface IUserDomain extends IBaseDomain, IUserRepPayload {}
