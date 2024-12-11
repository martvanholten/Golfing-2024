import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserController } from './user.controller';
import { UserRepo } from './user.repo';

@Module({
    imports: [MongooseModule.forFeature([
        {name: User.name, schema: UserSchema}
    ])],
    controllers: [UserController],
    providers: [UserRepo],
    exports: [UserRepo]
})
export class UserModule {}