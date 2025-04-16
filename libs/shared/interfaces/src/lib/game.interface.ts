import { GameTeamInterface } from "./team.interface";
import { ManagerInterface } from "./user.interface";

export interface GameInterface{
    winner?: string;
    date: Date;
    holes: number;
    name:string;
    location:string;
    teams: GameTeamInterface[]
    gameManager: ManagerInterface
}

export interface CreateGameInterface{
    winner?: string;
    date?: Date;
    holes?: number;
    name?:string;
    location?:string;
    teams: GameTeamInterface[]
    gameManager?: ManagerInterface
}

export interface TeamGameInterface{
    date: Date;
    name:string;
    location:string;
}