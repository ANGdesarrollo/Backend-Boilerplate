import { v4 as uuidv4 } from 'uuid';
import {Schema, model, Document} from "mongoose";
import {IRoleDomain} from "../../Domain/Entities/IRoleDomain";
import {Role} from "../../Domain/Entities/Role";

export type RoleMongooseDocument = Document & IRoleDomain;

const RoleSchema = new Schema<RoleMongooseDocument>({
    _id: { type: String, default: uuidv4 },
    role: { type: String, enum: ['admin', 'user']}
}, { timestamps: true });

RoleSchema.loadClass(Role);

export const RoleModel = model('Role', RoleSchema);
