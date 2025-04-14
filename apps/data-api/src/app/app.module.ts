import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { Logger } from '@nestjs/common';
import { BackendFeaturesModule } from '@avans-nx-workshop/backend/features';
import { ConfigService } from '@nestjs/config'
 
@Module({
    imports: [
        MongooseModule.forRoot(environment.MONGO_DB_CONNECTION_STRING, {
            connectionFactory: (connection) => {
                connection.on('connected', () => {
                    Logger.verbose(
                        `Mongoose db connected to ${environment.MONGO_DB_CONNECTION_STRING}`
                    );
                });
                connection._events.connected();
                return connection;
            }
        }),
        BackendFeaturesModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {
    confServ: ConfigService = undefined
}
