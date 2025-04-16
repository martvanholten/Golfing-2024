import { GameInterface } from "./game.interface";
import { ManagerInterface } from "./user.interface";

export interface LocationInterface{
    _id: string;
    name: string;
    city: string;
    address: string;
    houseNumber: number
    large: boolean;
    games: GameInterface[];
    locationManager: ManagerInterface;
}

export interface CreateLocationInterface{
    name?: string;
    city?: string;
    address?: string;
    houseNumber?: number
    large?: boolean;
    games: GameInterface[];
    locationManager?: ManagerInterface;
}