import { CreateGameInterface, GameInterface, ManagerInterface, TeamInterface } from '@avans-nx-workshop/shared/interfaces';

export class Game implements GameInterface{
    winner!: string;
    date!: Date;
    holes!: number;
    name!:string;
    location!: string;
    teams: TeamInterface[] = new Array<TeamInterface>;
    gameManager!: ManagerInterface;

    constructor(winner: string, date: Date, holes: number, name: string, location: string, gameManager: ManagerInterface){
        this.winner = winner,
        this.date = date,
        this.holes = holes,
        this.name = name,
        this.location = location
        this.gameManager = gameManager
    }
}

export class CreateGame implements CreateGameInterface{
    teams: TeamInterface[] = new Array<TeamInterface>;
    winner?: string;
    date?: Date;
    holes?: number;
    name?:string;
    location?: string;
}