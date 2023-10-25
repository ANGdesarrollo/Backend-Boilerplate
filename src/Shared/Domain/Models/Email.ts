import nodeMailer from 'nodemailer';
import { env } from '../../../Config/EnvConfig/envConfig';
import { ITemplate } from './ITemplate';
export class Email
{
    static async createTransport(template: ITemplate)
    {
        try
        {
            const transporter = nodeMailer.createTransport({
                host: env.NODE_HOST_NODEMAILER,
                port: env.NODE_PORT_NODEMAILER,
                secure: true,
                auth: {
                    user: env.NODE_USERNAME_NODEMAILER,
                    pass: env.NODE_PASSWORD_NODEMAILER
                }
            });

            await transporter.verify();

            await transporter.sendMail(template);
        }
        catch (error)
        {
            throw new Error(error as string);
        }
    }
}
