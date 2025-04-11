import { Injectable, Logger } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';

@Injectable()
export class UserService {
    private readonly logger: Logger = new Logger(UserService.name);

    constructor(private readonly neo4jService: Neo4jService) {}

    async findAll(): Promise<any> {
        this.logger.log('findAll users');
        return await this.neo4jService.read(
            `MATCH (n) RETURN count(n) AS count;`
        );
    }
}
