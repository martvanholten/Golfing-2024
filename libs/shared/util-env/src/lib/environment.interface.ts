import { Neo4jScheme } from '@avans-nx-workshop/shared/interfaces'

export interface IEnvironment {
    production: boolean;

    ROOT_DOMAIN_URL: string;
    dataApiUrl: string;

    MONGO_DB_CONNECTION_STRING: string;

    JWT_ACCESS_TOKEN_SECRET: string;
    JWT_ACCESS_TOKEN_EXP_TIME: string;

    NEO4J_SCHEME: Neo4jScheme;
    NEO4J_HOST: string;
    NEO4J_PORT: string | number;
    NEO4J_USERNAME: string;
    NEO4J_PASSWORD: string;
    NEO4J_DATABASE?: string;
}
