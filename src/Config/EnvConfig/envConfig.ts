import dotenv from 'dotenv';
import { IEnvConfig } from './IEnvConfig';
import * as process from 'process';
dotenv.config();

if (!process.env.NODE_ENV)
{
    throw new Error('Environment not properly set. NODE_ENV not set');
}

if (!process.env.NODE_PORT)
{
    throw new Error('Environment not properly set. PORT not set');
}

if (!process.env.NODE_URL_API)
{
    throw new Error('Environment not properly set. URL_API not set');
}

if (!process.env.NODE_URL_WEB)
{
    throw new Error('Environment not properly set. URL_WEB not set');
}

if (!process.env.NODE_MONGO_ATLAS_URI)
{
    throw new Error('Environment not properly set. NODE_MONGO_ATLAS_URI not set');
}

export const env: IEnvConfig = {
    NODE_ENV: process.env.NODE_ENV,
    NODE_PORT: Number(process.env.NODE_PORT),
    NODE_URL_API: process.env.NODE_URL_API,
    NODE_URL_WEB: process.env.NODE_URL_WEB,
    NODE_MONGO_ATLAS_URI: process.env.NODE_MONGO_ATLAS_URI
};
