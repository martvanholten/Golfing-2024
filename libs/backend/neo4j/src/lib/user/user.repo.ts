import { Injectable, Logger } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';

@Injectable()
export class UserRepo{
    private readonly logger: Logger = new Logger(UserRepo.name);
    
    constructor(
        private readonly neo4jService: Neo4jService
    ) {}

    async getCount(): Promise<any>{
        return await this.neo4jService.read(
            `MATCH (n) RETURN count(n) AS count;`
        );
    }
}
