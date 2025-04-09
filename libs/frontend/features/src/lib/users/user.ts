import { CreateUserInterface, LoginDataInterface, TeamInterface, UserInterface } from '@avans-nx-workshop/shared/interfaces';

export class User implements UserInterface{
    _id!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    role!: string;
    handicap!: number;
    age!: number;
    teams: TeamInterface[] = new Array<TeamInterface>;
    
    constructor(_id: string, firstName: string, lastName: string, email: string, password: string, role:string, handicap: number, age: number){
        this._id = _id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password
        this.role = role;
        this.handicap = handicap;
        this.age = age;
    }
}

export class LoginData implements LoginDataInterface{
    email!: string;
    password!: string;
}

export class CreateUser implements CreateUserInterface{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: string;
    handicap?: number;
    age?: number;
    teams: TeamInterface[] = new Array<TeamInterface>;
}