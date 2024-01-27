import { IUserRepPayload } from '../Payloads/User/IUserRepPayload';
import { UserRepository } from '../../Infraestructure/Repositories/UserRepository';
import { ISignUpUserUseCase } from './ISignUpUserUseCase';
import { IUserDomain } from '../Entities/User/IUserDomain';
import { User } from '../Entities/User/User';


export class SignUpUserUseCase extends UserRepository implements ISignUpUserUseCase
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

        const user = new User(payload);
        user.enable = true;
        user.verify = false;
        console.log(user)
        return await this.userRepository.save(user);
    }
}
