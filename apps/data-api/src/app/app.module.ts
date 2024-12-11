import { Module } from '@nestjs/common';
// import { AuthModule } from '@avans-nx-workshop/backend/auth';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { Logger } from '@nestjs/common';
import { BackendFeaturesModule } from '@avans-nx-workshop/backend/features';
@Module({
    imports: [
        // AuthModule,
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
export class AppModule {}
