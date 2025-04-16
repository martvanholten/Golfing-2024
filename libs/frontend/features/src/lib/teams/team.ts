import { CreateTeamInterface, GameInterface, TeamGameInterface, TeamInterface, TeamUserInterface, UserInterface } from '@avans-nx-workshop/shared/interfaces'

export class Team implements TeamInterface{
    _id!: string;
    rank!: number;
    name!: string;
    largeGames!: boolean;
    teamCaptain!: string;
    games!: TeamGameInterface[];
    golfers!: TeamUserInterface[];
    
    constructor(_id: string, rank: number, name: string, largeGames: boolean, teamCaptain: string, games: TeamGameInterface[], golfers: TeamUserInterface[]){
        this._id = _id,
        this.rank = rank,
        this.name = name,
        this.largeGames = largeGames
        this.teamCaptain = teamCaptain
        this.games = games
        this.golfers = golfers
    }
}

export class CreateTeam implements CreateTeamInterface{
    rank?: number;
    name?: string;
    largeGames?: boolean;
    teamCaptain?: string;
    games: TeamGameInterface[] = new Array<TeamGameInterface>;
    golfers: TeamUserInterface[] = new Array<TeamUserInterface>;
}