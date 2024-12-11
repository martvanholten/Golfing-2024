import { CreateTeamInterface, GameInterface, TeamInterface, UserInterface } from '@avans-nx-workshop/shared/interfaces'
import { Game } from '../games/game';

export class Team implements TeamInterface{
    _id!: string;
    rank!: number;
    name!: string;
    largeGames!: boolean;
    teamCaptain!: string;
    games!: GameInterface[];
    golfers!: UserInterface[];
    
    constructor(_id: string, rank: number, name: string, largeGames: boolean, teamCaptain: string){
        this._id = _id,
        this.rank = rank,
        this.name = name,
        this.largeGames = largeGames
        this.teamCaptain = teamCaptain
    }
}

export class CreateTeam implements CreateTeamInterface{
    rank?: number;
    name?: string;
    largeGames?: boolean;
    teamCaptain?: string;
    games: GameInterface[] = new Array<GameInterface>;
    golfers: UserInterface[] = new Array<UserInterface>;
}