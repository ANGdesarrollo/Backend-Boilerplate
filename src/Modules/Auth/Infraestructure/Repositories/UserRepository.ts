import {BaseMongooseRepository} from "../../../../Shared/Infraestructure/Repository/BaseMongooseRepository";
import {IUserDomain} from "../../Domain/Entities/User/IUserDomain";
import {UserModel, UserMongooseDocument } from "../Schemas/UserMongooseSchema";
import {IUserRepository} from "./IUserRepository";

export class UserRepository extends BaseMongooseRepository<IUserDomain, UserMongooseDocument> implements IUserRepository {
    constructor() {
        super(UserModel);
    }
}
