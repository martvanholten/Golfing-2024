import { TeamInterface } from "./team.interface";
import { ManagerInterface } from "./user.interface";

export interface GameInterface{
    winner?: string;
    date: Date;
    holes: number;
    name:string;
    location:string;
    teams: TeamInterface[]
    gameManager: ManagerInterface
}

export interface CreateGameInterface{
    winner?: string;
    date?: Date;
    holes?: number;
    name?:string;
    location?:string;
    teams: TeamInterface[]
    gameManager?: ManagerInterface
}