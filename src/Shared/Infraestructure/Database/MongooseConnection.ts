// Configuración de la conexión
import mongoose from "mongoose";
import { env } from "../../../Config/EnvConfig/envConfig";

// TODO: ESTO ESTA HORRIBLE, hay q buscar opciones de configuraciones para la conexion, por seguridad y performance.
// TODO: Investigar si la configuracion para un MongoDB local es la misma para Mongo Atlas o es diferente.
export const mongooseConnection = async () =>
{
    await mongoose.connect(env.NODE_MONGO_ATLAS_URI);
}
