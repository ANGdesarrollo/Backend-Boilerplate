import { BaseMongooseRepository } from '../../../../Shared/Infraestructure/Repository/BaseMongooseRepository';
import { IRoleDomain } from '../../Domain/Entities/IRoleDomain';
import { RoleModel, RoleMongooseDocument } from '../Schema/RoleMongooseSchema';
import { IRoleRepository } from './IRoleRepository';


export class RoleRepository
    extends BaseMongooseRepository<IRoleDomain, RoleMongooseDocument> implements IRoleRepository
{
    constructor()
    {
        super(RoleModel);
    }
}
