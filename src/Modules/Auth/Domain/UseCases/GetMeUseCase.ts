import { UserRepository } from '../../Infraestructure/Repositories/UserRepository';
import { IUserDomain } from '../Entities/User/IUserDomain';
import { IGetMeUseCase } from './IGetMeUseCase';

export class GetMeUseCase extends UserRepository implements IGetMeUseCase
{
    private userRepository: UserRepository;
    constructor()
    {
        super();
        this.userRepository = new UserRepository();
    }

    public async handle(payload: string): Promise<IUserDomain>
    {
        const user = await this.userRepository.getOne({
            username: payload
        });

        if (!user)
        {
            throw new Error('Invalid User');
        }

        return user;
    }
}
