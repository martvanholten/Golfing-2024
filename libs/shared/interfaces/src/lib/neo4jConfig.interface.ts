export type Neo4jScheme = 
    | 'neo4j' 
    | 'neo4j+s'
    | 'bolt' 
    | 'bolt+s'

export interface Neo4jConfigInterface{
    NEO4J_SCHEME: Neo4jScheme;
    NEO4J_HOST: string;
    NEO4J_PORT: string | number;
    NEO4J_USERNAME: string;
    NEO4J_PASSWORD: string;
    NEO4J_DATABASE?: string;
}