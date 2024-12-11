import { GameInterface } from "./game.interface";
import { UserInterface } from "./user.interface";

export interface TeamInterface{
    _id: string;
    rank: number;
    name: string;
    largeGames: boolean;
    games: GameInterface[];
    golfers: UserInterface[];
    teamCaptain: string
}

export interface CreateTeamInterface{
    _id?: string;
    rank?: number;
    name?: string;
    largeGames?: boolean;
    games: GameInterface[];
    golfers: UserInterface[];
    teamCaptain?: string
}