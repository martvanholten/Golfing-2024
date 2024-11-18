import { TeamInterface } from '@avans-nx-workshop/shared/interfaces'

export class Team implements TeamInterface{
    id?: number;
    rank?: number;
    name?: string;
    largeGames?: boolean;
    
    constructor(id?: number, rank?: number, name?: string, largeGames?: boolean){
        this.id = id,
        this.rank = rank,
        this.name = name,
        this.largeGames = largeGames
    }
}