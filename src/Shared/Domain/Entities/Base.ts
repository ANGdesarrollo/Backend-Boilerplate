
import {IBaseDomain} from './IBaseDomain';
import { v4 as uuidv4 } from 'uuid';

export abstract class Base implements IBaseDomain
{
    _id: uuidv4;

    createdAt: Date;
    updatedAt: Date;

    protected constructor()
    {
        this._id = uuidv4();
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    getId(): string
    {
        return this._id;
    }

    setId(id: uuidv4)
    {
        this._id = id;
    }
}
