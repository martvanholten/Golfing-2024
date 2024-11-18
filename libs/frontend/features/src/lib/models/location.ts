import { LocationInterface } from '@avans-nx-workshop/shared/interfaces';

export class Location implements LocationInterface{
    id?: number;
    name?: string;
    city?: string;
    address?: string;
    large?: boolean;

    constructor(id?: number, name?: string, city?: string, address?: string, large?: boolean){
        this.id = id,
        this.city = city,
        this.name = name,
        this.address = address,
        this.large = large
    }
}