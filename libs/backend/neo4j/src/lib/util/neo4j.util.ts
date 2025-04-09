import { Neo4jConfigInterface } from "@avans-nx-workshop/shared/interfaces";
import { environment } from "@avans-nx-workshop/shared/util-env";
import { Connection } from 'cypher-query-builder';
import neo4j, { Driver } from 'neo4j-driver';

export const NEO4J_CONFIG = 'NEO4J_CONFIG';
export const NEO4J_CONNECTION = 'NEO4J_CONNECTION';

export const createNeo4jConfig = (costumConfig?: Neo4jConfigInterface): Neo4jConfigInterface => {
    return costumConfig || {
        NEO4J_SCHEME: environment.NEO4J_SCHEME,
        NEO4J_HOST: environment.NEO4J_HOST,
        NEO4J_PORT: environment.NEO4J_PORT,
        NEO4J_USERNAME: environment.NEO4J_USERNAME,
        NEO4J_PASSWORD: environment.NEO4J_PASSWORD,
        NEO4J_DATABASE: environment.NEO4J_DATABASE
    }
}

export const createNeo4jConnection = async (config: Neo4jConfigInterface): Promise<Driver> => {
    const driver: Driver = neo4j.driver(
        `${config.NEO4J_SCHEME}://${config.NEO4J_HOST}:${config.NEO4J_PORT}`,
        neo4j.auth.basic(config.NEO4J_USERNAME, config.NEO4J_PASSWORD)
    )

    await driver.verifyAuthentication()

    return driver;
}

export const createNeo4jConnectionTest = async (config: Neo4jConfigInterface): Promise<Connection> => {
    return new Connection(`${config.NEO4J_SCHEME}://${config.NEO4J_HOST}:${config.NEO4J_PORT}`,
        {
            username: config.NEO4J_USERNAME, 
            password: config.NEO4J_PASSWORD,
        }
    )
}

export class ConnectionError extends Error{
    constructor(){
        super()
        this.message = 'Could not establish a connention with the Neo4j database'
        this.name = 'Connection error'
    }
}