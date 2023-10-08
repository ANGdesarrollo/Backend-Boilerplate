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

if (!process.env.NODE_TOKEN_SECRET)
{
    throw new Error('Environment not properly set. NODE_NODE_TOKEN_SECRET not set');
}

if (!process.env.NODE_TOKEN_REFRESH_SECRET)
{
    throw new Error('Environment not properly set. NODE_TOKEN_REFRESH_SECRET not set');
}

if (!process.env.NODE_COOKIE_SECRET)
{
    throw new Error('Environment not properly set. NODE_COOKIE_SECRET not set');
}

if (!process.env.NODE_PASSWORD_NODEMAILER)
{
    throw new Error('Environment not properly set. NODE_PASSWORD_NODEMAILER not set');
}

if (!process.env.NODE_HOST_NODEMAILER)
{
    throw new Error('Environment not properly set. NODE_HOST_NODEMAILER not set');
}

if (!process.env.NODE_PORT_NODEMAILER)
{
    throw new Error('Environment not properly set. NODE_PORT_NODEMAILER not set');
}

if (!process.env.NODE_USERNAME_NODEMAILER)
{
    throw new Error('Environment not properly set. NODE_USERNAME_NODEMAILER not set');
}

if (!process.env.NODE_TOKEN_EXPIRES_IN)
{
    throw new Error('Environment not properly set. NODE_TOKEN_EXPIRES_IN not set');
}

if (!process.env.NODE_COOKIE_EXPIRES_IN)
{
    throw new Error('Environment not properly set. NODE_TOKEN_EXPIRES_IN not set');
}

if (process.env.NODE_ENV === 'PRODUCTION' && !process.env.NODE_HTTPS_PASSPHRASE)
{
    throw new Error('Environment not properly set. NODE_HTTPS_PASSPHRASE not set');
}

export const env: IEnvConfig = {
    NODE_ENV: process.env.NODE_ENV,
    NODE_PORT: Number(process.env.NODE_PORT),
    NODE_URL_API: process.env.NODE_URL_API,
    NODE_URL_WEB: process.env.NODE_URL_WEB,
    NODE_MONGO_ATLAS_URI: process.env.NODE_MONGO_ATLAS_URI,
    NODE_TOKEN_SECRET: process.env.NODE_TOKEN_SECRET,
    NODE_TOKEN_REFRESH_SECRET: process.env.NODE_TOKEN_REFRESH_SECRET,
    NODE_COOKIE_SECRET:process.env.NODE_COOKIE_SECRET,
    NODE_PASSWORD_NODEMAILER: process.env.NODE_PASSWORD_NODEMAILER,
    NODE_HOST_NODEMAILER: process.env.NODE_HOST_NODEMAILER,
    NODE_PORT_NODEMAILER: Number(process.env.NODE_PORT_NODEMAILER),
    NODE_USERNAME_NODEMAILER: process.env.NODE_USERNAME_NODEMAILER,
    NODE_TOKEN_EXPIRES_IN: Number(process.env.NODE_TOKEN_EXPIRES_IN),
    NODE_COOKIE_EXPIRES_IN: Number(process.env.NODE_COOKIE_EXPIRES_IN),
    NODE_HTTPS_PASSPHRASE: process.env.NODE_HTTPS_PASSPHRASE
};
