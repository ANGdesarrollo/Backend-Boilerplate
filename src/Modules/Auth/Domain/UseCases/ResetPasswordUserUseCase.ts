import { UserRepository } from '../../Infraestructure/Repositories/UserRepository';
import { IUserRepPayload } from '../Payloads/User/IUserRepPayload';
import { IUserDomain } from '../Entities/User/IUserDomain';
import { ISignInUserUseCase } from './ISignInUserUseCase';
import { compareHash, createHash } from '../../../../Shared/Utils/Hash';
import { IResetPasswordUserUseCase } from './IResetPasswordUserUseCase';
import { User } from '../Entities/User/User';
import { IUserResetPasswordPayload } from '../Payloads/User/IUserResetPasswordPayload';
import { JWToken } from '../Models/JWToken';

export class ResetPasswordUserUseCase extends UserRepository implements IResetPasswordUserUseCase
{
    private userRepository: UserRepository;
    constructor()
    {
        super();
        this.userRepository = new UserRepository();
    }

    public async handle(payload: IUserResetPasswordPayload): Promise<IUserDomain>
    {
        const token = JWToken.verifyJWT(payload.jwt);
        const user = await this.userRepository.getOne({
            username: token.data.username
        });

        if (!user)
        {
            throw new Error('Invalid User');
        }

        user.password = createHash(payload.password);

        return await this.userRepository.update(user);
    }
}
