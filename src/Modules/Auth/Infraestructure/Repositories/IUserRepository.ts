import {IBaseRepository} from "../../../../Shared/Infraestructure/Repository/IBaseRepository";
import {IUserDomain} from "../../Domain/Entities/User/IUserDomain";

// Aca se pueden definir metodos.
export interface IUserRepository extends IBaseRepository<IUserDomain> {}
