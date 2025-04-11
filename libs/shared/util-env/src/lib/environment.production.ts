import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: true,

    ROOT_DOMAIN_URL: 'https://happy-pond-0613f1a03.5.azurestaticapps.net/',
    dataApiUrl: 'https://golfing-data-api.azurewebsites.net/',

    MONGO_DB_CONNECTION_STRING: 'mongodb+srv://mart:Kwartsio1!@golfing.kalu6wv.mongodb.net/?retryWrites=true&w=majority&appName=Golfing',

    JWT_ACCESS_TOKEN_SECRET: 'golfing-secret',
    JWT_ACCESS_TOKEN_EXP_TIME: '1d',

    NEO4J_SCHEME: 'neo4j',
    NEO4J_HOST: 'localhost',
    NEO4J_PORT: '7687',
    NEO4J_USERNAME: 'neo4j',
    NEO4J_PASSWORD: 'Password1!',
};
