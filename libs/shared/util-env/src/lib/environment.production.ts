import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: true,

    ROOT_DOMAIN_URL: 'https://happy-pond-0613f1a03.5.azurestaticapps.net/',
    dataApiUrl: 'https://golfing-data-api.azurewebsites.net/',
    NEO4J_DOMAIN_URL: 'https://golfing-api-neo4j.azurewebsites.net',


    MONGO_DB_CONNECTION_STRING: 'mongodb+srv://golfing:Password@golfing.4n543b4.mongodb.net/',

    JWT_ACCESS_TOKEN_SECRET: 'golfing-secret',
    JWT_ACCESS_TOKEN_EXP_TIME: '1d',

    NEO4J_SCHEME: 'neo4j+s',
    NEO4J_HOST: 'd3e9d72d.databases.neo4j.io',
    NEO4J_PORT: '',
    NEO4J_USERNAME: 'neo4j',
    NEO4J_PASSWORD: 'mq7Xfy3nfb1lw3dpyuKhfgLOv5o3nPqO3oJYEXTPNi0',
};
