import { UserRepository } from '../../Infraestructure/Repositories/UserRepository';
import { IUserRepPayload } from '../Payloads/User/IUserRepPayload';
import { IUserDomain } from '../Entities/User/IUserDomain';
import { ISignInUserUseCase } from './ISignInUserUseCase';
import { compareHash, createHash } from '../../../../Shared/Utils/Hash';

export class SignInUserUseCase extends UserRepository implements ISignInUserUseCase
{
    private userRepository: UserRepository;
    constructor()
    {
        super();
        this.userRepository = new UserRepository();
    }

    public async handle(payload: IUserRepPayload): Promise<IUserDomain>
    {
        const user = await this.userRepository.getOne({
            username: payload.username
        });

        if (!user)
        {
            throw new Error('Invalid User');
        }

        const passwordMatch = compareHash(payload.password, user.password);

        if (passwordMatch)
        {
            return user;
        }

        throw new Error('Invalid password');
    }
}
