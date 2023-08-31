import dotenv from 'dotenv';
import { IEnvConfig } from './IEnvConfig';
dotenv.config();

if (!process.env.NODE_ENV)
{
    throw new Error('Environment not properly set. NODE_ENV not set');
}

if (!process.env.NODE_PORT)
{
    throw new Error('Environment not properly set. PORT not set');
}

export const env: IEnvConfig = {
    NODE_ENV: process.env.NODE_ENV,
    NODE_PORT: Number(process.env.NODE_PORT)
};
