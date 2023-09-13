import { env } from '../EnvConfig/envConfig';
import fs from 'fs';

let httpsConfig;

if (env.NODE_ENV === 'PRODUCTION')
{
    httpsConfig = {
        key: fs.readFileSync('./key.pem'), // Ruta a tu clave privada
        cert: fs.readFileSync('./cert.pem'), // Ruta a tu certificado
        passphrase: env.NODE_HTTPS_PASSPHRASE
    };
}
else
{
    httpsConfig = false;
}

export default httpsConfig;
