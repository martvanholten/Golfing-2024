import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: false,

    ROOT_DOMAIN_URL: 'http://localhost:4200',
    dataApiUrl: 'http://localhost:3000/api',
    NEO4J_DOMAIN_URL: 'http://localhost:3100/api',

    MONGO_DB_CONNECTION_STRING: 'mongodb+srv://golfing:Password@golfing.4n543b4.mongodb.net/',

    JWT_ACCESS_TOKEN_SECRET: 'golfing-secret',
    JWT_ACCESS_TOKEN_EXP_TIME: '1d',

    NEO4J_SCHEME: 'neo4j',
    NEO4J_HOST: 'localhost',
    NEO4J_PORT: '7687',
    NEO4J_USERNAME: 'neo4j',
    NEO4J_PASSWORD: 'Password1!',
};