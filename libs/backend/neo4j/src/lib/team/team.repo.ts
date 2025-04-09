import { Inject, Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';
import { NEO4J_CONNECTION } from '@avans-nx-workshop/backend/neo4j';
import { Connection } from 'cypher-query-builder';
import { Driver } from 'neo4j-driver';

@Injectable()
export class TeamRepo implements OnApplicationShutdown{
    private readonly logger: Logger = new Logger(TeamRepo.name);
    
    constructor(
        @Inject(NEO4J_CONNECTION)
        private readonly connection: Driver,
    ) {}

    onApplicationShutdown() {
        this.connection.close();
    }
}