import { CreateGameInterface, GameInterface, ManagerInterface, GameTeamInterface } from '@avans-nx-workshop/shared/interfaces';

export class Game implements GameInterface{
    winner!: string;
    date!: Date;
    holes!: number;
    name!:string;
    location!: string;
    teams: GameTeamInterface[] = new Array<GameTeamInterface>;
    gameManager!: ManagerInterface;

    constructor(winner: string, date: Date, holes: number, name: string, location: string, gameManager: ManagerInterface, teams: GameTeamInterface[]){
        this.winner = winner,
        this.date = date,
        this.holes = holes,
        this.name = name,
        this.location = location
        this.gameManager = gameManager
        this.teams = teams
    }
}

export class CreateGame implements CreateGameInterface{
    teams: GameTeamInterface[] = new Array<GameTeamInterface>;
    winner?: string;
    date?: Date;
    holes?: number;
    name?:string;
    location?: string;
}