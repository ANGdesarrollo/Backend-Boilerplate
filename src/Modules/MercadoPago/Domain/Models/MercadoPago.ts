import { MercadoPagoConfig, Preference, Payment, MerchantOrder } from 'mercadopago';
import { env } from '../../../../Config/EnvConfig/envConfig';

export class MercadoPago
{
    private readonly client: MercadoPagoConfig;
    private readonly preference: Preference;
    private readonly payment: Payment;
    private readonly merchantOrder: MerchantOrder;

    constructor()
    {
        this.client = new MercadoPagoConfig({
            accessToken: env.NODE_MERCADOPAGO_TOKEN
        });

        this.preference = new Preference(this.client);
        this.payment = new Payment(this.client);
        this.merchantOrder = new MerchantOrder(this.client);
    }

    getPayment()
    {
        return this.payment;
    }

    getPreference()
    {
        return this.preference;
    }

    getMerchantOrder()
    {
        return this.merchantOrder;
    }
}
