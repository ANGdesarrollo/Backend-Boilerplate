import { FastifyReply, FastifyRequest } from 'fastify';
import { MercadoPago } from '../Domain/Models/MercadoPago';
import { JWToken } from '../../Auth/Domain/Models/JWToken';
import {CreateOrderPayload} from "../Entities/Payloads/CreateOrderPayload";


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
        const requestBody = request.body as CreateOrderPayload;
        const data = {
            ...requestBody,
            notification_url: 'https://d3dd-181-197-208-42.ngrok-free.app/api/mercado-pago/webhook',
            external_reference: token.data.username,
        }
        const result = await preference.create({
            body: data });

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
        const merchantOrder = this.mercadoPago.getMerchantOrder();

        if (data['type'] === 'payment')
        {
            const paymentResponse = await payment.get({
                id: data['data.id']
            });

            const test = await merchantOrder.get({
                merchantOrderId: paymentResponse.order.id
            })
            console.log('SOY PAYMENT RESPONSE', JSON.stringify(test, null, 4));
        }

        await reply.status(201);
    };
}
