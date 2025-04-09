import { Module } from '@nestjs/common';
import { Neo4jModule } from 'nest-neo4j';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
    imports: [Neo4jModule],
    controllers: [UserController],
    providers: [UserService],
    exports: []
})
export class Neo4jBackendModule {}
