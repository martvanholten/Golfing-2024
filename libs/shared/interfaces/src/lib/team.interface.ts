import { GameInterface, TeamGameInterface } from "./game.interface";
import { TeamUserInterface } from "./user.interface";

export interface TeamInterface{
    _id: string;
    rank: number;
    name: string;
    largeGames: boolean;
    games: TeamGameInterface[];
    golfers: TeamUserInterface[];
    teamCaptain: string
}

export interface CreateTeamInterface{
    _id?: string;
    rank?: number;
    name?: string;
    largeGames?: boolean;
    games: TeamGameInterface[];
    golfers: TeamUserInterface[];
    teamCaptain?: string
}

export interface UserTeamInterface{
    rank: number
    name: string
}

export interface GameTeamInterface{
    rank: number
    name: string
}