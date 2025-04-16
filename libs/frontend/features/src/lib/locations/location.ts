import { CreateLocationInterface, GameInterface, LocationInterface, ManagerInterface } from '@avans-nx-workshop/shared/interfaces';

export class Location implements LocationInterface{
    _id!: string;
    name!: string;
    city!: string;
    address!: string;
    large!: boolean;
    houseNumber!: number;
    games!: GameInterface[];
    locationManager!: ManagerInterface;

    constructor(_id: string, name: string, city: string, address: string, large: boolean, locationManager: ManagerInterface){
        this._id = _id,
        this.city = city,
        this.name = name,
        this.address = address,
        this.large = large
        this.locationManager = locationManager
    }
}

export class CreateLocation implements CreateLocationInterface{
    name?: string;
    city?: string;
    address?: string;
    large?: boolean;
    houseNumber?: number;
    games: GameInterface[] = new Array<GameInterface>;
    locationManager?: ManagerInterface;
}