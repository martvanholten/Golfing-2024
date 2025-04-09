import { CreateLocationInterface, GameInterface, LocationInterface } from '@avans-nx-workshop/shared/interfaces';

export class Location implements LocationInterface{
    _id!: string;
    name!: string;
    city!: string;
    address!: string;
    large!: boolean;
    houseNumber!: number;
    games: GameInterface[] = new Array<GameInterface>;

    constructor(_id: string, name: string, city: string, address: string, large: boolean){
        this._id = _id,
        this.city = city,
        this.name = name,
        this.address = address,
        this.large = large
    }
}

export class CreateLocation implements CreateLocationInterface{
    name?: string;
    city?: string;
    address?: string;
    large?: boolean;
    houseNumber?: number;
    games: GameInterface[] = new Array<GameInterface>;
}