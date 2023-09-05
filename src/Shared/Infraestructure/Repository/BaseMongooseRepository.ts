import { IBaseDomain } from '../../Domain/Entities/IBaseDomain';
import { FilterQuery, Model, Document } from 'mongoose';
import { IBaseRepository } from './IBaseRepository';

export class BaseMongooseRepository<T extends IBaseDomain, D extends Document & T> implements IBaseRepository<T>
{
    protected repository: Model<D>;

    constructor(model: Model<D>)
    {
        this.repository = model;
    }

    async save(entity: T): Promise<T>
    {
        return await this.repository.create(entity);
    }

    async update(entity: T): Promise<T>
    {
        return this.repository.findOneAndUpdate({ _id: entity.getId() } as FilterQuery<T>, { $set: entity }, { new: true });
    }

    async getOne(condition: Record<string, any>): Promise<T>
    {
        const entity = await this.repository.findOne(condition as FilterQuery<T>).exec();

        if (!entity)
        {
            // TODO: Ver como crear Exceptions personalizadas
            throw new Error('Not found');
        }

        return entity;
    }

    async getOneById(id: string): Promise<T>
    {
        return await this.repository.findById(id).exec();
    }

    async delete(id: string)
    {
        const entity = await this.repository.findByIdAndDelete({ _id: id });

        if (!entity)
        {
            throw new Error('Not found');
        }

        return entity;
    }
}
