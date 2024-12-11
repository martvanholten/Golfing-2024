import { TeamInterface } from "./team.interface";

//Could make a new interface with name and location to add to team
export interface GameInterface{
    winner: string;
    date: Date;
    holes: number;
    name:string;
    location:string;
    teams: TeamInterface[]
}

export interface CreateGameInterface{
    winner?: string;
    date?: Date;
    holes?: number;
    name?:string;
    location?:string;
    teams: TeamInterface[]
}