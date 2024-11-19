import { GameInterface } from '@avans-nx-workshop/shared/interfaces';

export class Game implements GameInterface{
    winner?: string;
    date?: Date;
    holes?: number;
    name?:string;
    location?: string;

    constructor(winner?: string, date?: Date, holes?: number, name?: string, location?: string){
        this.winner = winner,
        this.date = date,
        this.holes = holes,
        this.name = location,
        this.location = location
    }
}