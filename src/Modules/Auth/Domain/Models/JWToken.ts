import jwt from 'jsonwebtoken';
import { env } from '../../../../Config/EnvConfig/envConfig';

interface IJWT
{
    data: {
        username: string;
    }
}
export class JWToken
{
    static setJWT(username: string): string
    {
        return jwt.sign({
            exp: Math.floor(Date.now() / 1000) + env.NODE_TOKEN_EXPIRES_IN,
            data: {
                username
            }
        }, env.NODE_TOKEN_SECRET);
    }

    static verifyJWT(accessToken: string): IJWT
    {
        return jwt.verify(accessToken, env.NODE_TOKEN_SECRET);
    }
}
