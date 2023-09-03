import { UserRepository } from '../../Infraestructure/Repositories/UserRepository';
import { IUserDomain } from '../Entities/User/IUserDomain';
import { User } from '../Entities/User/User';

export class CreateUserUseCase
{
    private userRepository: UserRepository;
    constructor()
    {
        this.userRepository = new UserRepository();
    }

    // TODO: Entender como manejar esto sin ANY, ejemplo de donde investigar = https://github.com/DigiChanges/node-experience
    async handle(payload: any): Promise<IUserDomain>
    {
        return await this.userRepository.save(payload);
    }
}
