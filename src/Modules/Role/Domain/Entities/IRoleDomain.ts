

// Esta interfaz se utiliza para definir metodos de clases
import {IBaseDomain} from "../../../../Shared/Domain/Entities/IBaseDomain";
import {IRoleRepPayload} from "../Payloads/IRoleRepPayload";

export interface IRoleDomain extends IBaseDomain, IRoleRepPayload {}
