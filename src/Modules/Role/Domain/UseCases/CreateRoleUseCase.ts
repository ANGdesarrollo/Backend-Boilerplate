import {RoleRepository} from "../../Infraestructure/Repositories/RoleRepository";
import {ICreateRoleUseCase} from "./ICreateRoleUseCase";
import {IRoleRepPayload} from "../Payloads/IRoleRepPayload";
import {IRoleDomain} from "../Entities/IRoleDomain";
import {Role} from "../Entities/Role";


export class CreateRoleUseCase extends RoleRepository implements ICreateRoleUseCase
{
    private roleRepository: RoleRepository;
    constructor()
    {
        super();
        this.roleRepository = new RoleRepository();
    }

    async handle(payload: IRoleRepPayload): Promise<IRoleDomain>
    {
        const roleExists = await this.roleRepository.getOne({
            role: payload.role
        });

        if (roleExists)
        {
            throw new Error('Role already exists');
        }

        const role = new Role(payload);
        return await this.roleRepository.save(role);
    }
}
