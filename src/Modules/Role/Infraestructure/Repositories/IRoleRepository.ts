import { IBaseRepository } from '../../../../Shared/Infraestructure/Repository/IBaseRepository';
import {IRoleDomain} from "../../Domain/Entities/IRoleDomain";

// Aca se pueden definir metodos.
export interface IRoleRepository extends IBaseRepository<IRoleDomain> {}
