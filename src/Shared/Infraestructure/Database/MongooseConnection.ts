// Configuración de la conexión
import mongoose from 'mongoose';
import { env } from '../../../Config/EnvConfig/envConfig';

// TODO: ESTO ESTA HORRIBLE, hay q buscar opciones de configuraciones para la conexion, por seguridad y performance.
// TODO: Investigar si la configuracion para un MongoDB local es la misma para Mongo Atlas o es diferente.
// TODO: Habria que ver si podemos ponerlo con clases asi bien lindo careta.
export const mongooseConnection = async(): Promise<void> =>
{
    await mongoose.connect(env.NODE_MONGO_ATLAS_URI);
};

export const mongooseStoreConnection = () =>
{

};
