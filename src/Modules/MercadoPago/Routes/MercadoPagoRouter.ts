import { FastifyInstance } from 'fastify';
import { MercadoPagoController } from '../Controller/MercadoPagoController';

export class MercadoPagoRoutes
{
    private app: FastifyInstance;
    private MercadoPagoController: MercadoPagoController;

    constructor(app: FastifyInstance)
    {
        this.app = app;
        this.MercadoPagoController = new MercadoPagoController();
    }

    public start()
    {
        this.app.post('/api/mercado-pago/create-order', {
            handler: this.MercadoPagoController.createOrder
        });
        this.app.get('/api/mercado-pago/success', {
            handler: MercadoPagoController.success
        });
        this.app.get('/api/mercado-pago/failure', {
            handler: MercadoPagoController.failure
        });
        this.app.get('/api/mercado-pago/pending', {
            handler: MercadoPagoController.pending
        });
        this.app.post('/api/mercado-pago/webhook', {
            handler: this.MercadoPagoController.webhook
        });
    }
}
