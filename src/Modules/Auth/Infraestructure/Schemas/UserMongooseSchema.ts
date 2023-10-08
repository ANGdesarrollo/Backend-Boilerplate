import { Schema, Document, model } from 'mongoose';
import { IUserDomain } from '../../Domain/Entities/User/IUserDomain';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../Domain/Entities/User/User';

export type UserMongooseDocument = Document & IUserDomain;

const UserSchema = new Schema<UserMongooseDocument>({
    _id: { type: String, default: uuidv4 },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // token: { type: String, unique: true },
    // resetPasswordToken: { type: String, unique: true},
    // permissions: { type: Array, required: true },
    role: { type: Schema.Types.String, ref: 'Role', required: true },
    enable: { type: Boolean, required: true },
    verify: { type: Boolean, required: true }
}, { timestamps: true });

UserSchema.loadClass(User);

export const UserModel = model('User', UserSchema);
