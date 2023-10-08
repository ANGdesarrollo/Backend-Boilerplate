import mongoose from 'mongoose';
import { env } from '../../../Config/EnvConfig/envConfig';


class MongooseConnection
{
    private readonly uri: string;

    constructor()
    {
        this.uri = env.NODE_MONGO_ATLAS_URI;
    }

    async connect()
    {
        await mongoose.connect(this.uri, {
            autoIndex: true
        });
    }

    async close()
    {
        await mongoose.connection.close();
    }
}

export default MongooseConnection;
