import { logger } from '../PinoConfig/pinoConfig';
import httpsConfig from '../HttpsConfig/httpsConfig';

export const fastifyConfig = {
    logger,
    https: httpsConfig
};
