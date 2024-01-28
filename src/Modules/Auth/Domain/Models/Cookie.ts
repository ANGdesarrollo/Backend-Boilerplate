import { FastifyReply } from 'fastify';
import { env } from '../../../../Config/EnvConfig/envConfig';

export class Cookie
{
    static generateCookie(reply: FastifyReply, cookieName: string, accessToken: string)
    {
        void reply.setCookie(cookieName, accessToken, {
            secure: env.NODE_ENV === 'PRODUCTION',
            signed: true,
            httpOnly: true,
            maxAge: env.NODE_COOKIE_EXPIRES_IN,
            path: '/'
        });
    }

    static removeCookie(reply: FastifyReply, cookieName: string)
    {
        void reply.clearCookie(cookieName, {
            signed: true
        });
    }
}
