import { GameInterface } from "./game.interface";

export interface LocationInterface{
    _id: string;
    name: string;
    city: string;
    address: string;
    houseNumber: number
    large: boolean;
    games: GameInterface[];
}

export interface CreateLocationInterface{
    _id?: string;
    name?: string;
    city?: string;
    address?: string;
    houseNumber?: number
    large?: boolean;
    games: GameInterface[];
}