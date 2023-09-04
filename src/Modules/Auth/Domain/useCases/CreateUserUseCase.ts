import { UserRepository } from '../../Infraestructure/Repositories/UserRepository';
import { IUserDomain } from '../Entities/User/IUserDomain';
import { IUserRepPayload } from '../Payloads/User/IUserRepPayload';
import { User } from '../Entities/User/User';

export class CreateUserUseCase extends UserRepository
{
    private userRepository: UserRepository;
    constructor()
    {
        super();
        this.userRepository = new UserRepository();
    }

    async handle(payload: IUserRepPayload): Promise<IUserDomain>
    {
        const usernameExists = await this.userRepository.getOne({
            username: payload.username
        });

        if (usernameExists)
        {
            throw new Error('User already exists');
        }

        const user: IUserDomain = new User(payload);
        return await this.userRepository.save(user);
    }
}
