import {UserRepository} from "../../Infraestructure/Repositories/UserRepository";
import {IUserDomain} from "../Entities/User/IUserDomain";

export class CreateUserUseCase {
    private userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }

    async handle(payload: IUserDomain): Promise<IUserDomain> {
        return await this.userRepository.save(payload);
    }
}
