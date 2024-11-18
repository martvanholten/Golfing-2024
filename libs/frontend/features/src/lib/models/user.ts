import { UserInterface } from '@avans-nx-workshop/shared/interfaces';

export class User implements UserInterface{
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: string;
    handicap?: number;
    age?: number;
    
    constructor(id?: number, firstName?: string, lastName?: string, email?: string, password?: string, role?:string, handicap?: number, age?: number){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.handicap = handicap;
        this.age = age;
    }
}