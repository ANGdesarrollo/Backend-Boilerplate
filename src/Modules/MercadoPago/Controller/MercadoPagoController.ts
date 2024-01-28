import { FastifyReply, FastifyRequest } from 'fastify';
import { IUserRepPayload } from '../../Auth/Domain/Payloads/User/IUserRepPayload';
import { env } from '../../../Config/EnvConfig/envConfig';
import { MercadoPago } from '../Domain/Models/MercadoPago';
import { JWToken } from '../../Auth/Domain/Models/JWToken';


export class MercadoPagoController
{
    mercadoPago: MercadoPago;
    constructor()
    {
        this.mercadoPago = new MercadoPago();
    }
    createOrder = async(request: FastifyRequest, reply: FastifyReply) =>
    {
        const cookie = reply.unsignCookie(request.cookies.accessToken);
        const token = JWToken.verifyJWT(cookie.value);
        const preference = this.mercadoPago.getPreference();

        const result = await preference.create({
            body: {
                items: [
                    {
                        id: '4567',
                        category_id: 'car_electronics',
                        currency_id: 'ARS',
                        description: 'Dummy create',
                        title: 'Dummy Title',
                        quantity: 1,
                        unit_price: 10
                    }
                ],
                back_urls: {
                    success: `${env.NODE_URL_API}/api/mercado-pago/success`,
                    failure: `${env.NODE_URL_API}/api/mercado-pago/failure`,
                    pending: `${env.NODE_URL_API}/api/mercado-pago/pending`
                },
                notification_url: 'https://e6e0-181-197-208-42.ngrok-free.app/api/mercado-pago/webhook',
                external_reference: token.data.username
            }
        });

        await reply.send(result);
    };

    static async success(request: FastifyRequest, reply: FastifyReply)
    {
        await reply.send('success');
    }

    static async failure(request: FastifyRequest, reply: FastifyReply)
    {
        await reply.send('failure');
    }

    static async pending(request: FastifyRequest, reply: FastifyReply)
    {
        await reply.send('pending');
    }

    webhook = async(request: FastifyRequest, reply: FastifyReply) =>
    {
        const data = request.query;
        const payment = this.mercadoPago.getPayment();

        if (data['type'] === 'payment')
        {
            const paymentResponse = await payment.get({
                id: data['data.id']
            });
            // console.log(JSON.stringify(paymentResponse, null, 4));
        }

        await reply.status(201);
    };
}
