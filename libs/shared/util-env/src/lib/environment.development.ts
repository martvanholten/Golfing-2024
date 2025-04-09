import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: false,

    ROOT_DOMAIN_URL: 'http://localhost:4200',
    dataApiUrl: 'http://localhost:3000/api',

    MONGO_DB_CONNECTION_STRING: 'mongodb://localhost:27017/golfing',

    JWT_ACCESS_TOKEN_SECRET: 'golfing-secret',
    JWT_ACCESS_TOKEN_EXP_TIME: '1d',

    NEO4J_SCHEME: 'neo4j',
    NEO4J_HOST: 'localhost',
    NEO4J_PORT: '7687',
    NEO4J_USERNAME: 'neo4j',
    NEO4J_PASSWORD: 'Password1!',
};
