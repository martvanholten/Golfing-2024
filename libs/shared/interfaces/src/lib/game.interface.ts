import { TeamInterface } from "./team.interface";

export interface GameInterface{
    winner?: string;
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