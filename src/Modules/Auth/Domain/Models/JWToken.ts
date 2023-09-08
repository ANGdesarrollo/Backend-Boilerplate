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
    static setJWT(expiresIn: number, username: string): string
    {
        return jwt.sign({
            expiresIn,
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
