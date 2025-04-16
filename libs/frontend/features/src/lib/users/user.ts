import { CreateUserInterface, LoginDataInterface, ManagerInterface, TeamInterface, UserInterface } from '@avans-nx-workshop/shared/interfaces';

export class User implements UserInterface{
    _id!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    role!: string;
    handicap!: number;
    age!: number;
    teams!: TeamInterface[];
    
    constructor(_id: string, firstName: string, lastName: string, email: string, password: string, role:string, handicap: number, age: number, teams: Array<TeamInterface>){
        this._id = _id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password
        this.role = role;
        this.handicap = handicap;
        this.age = age;
        this.teams = teams;
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

export class Manager implements ManagerInterface{
    _id!: string
    name!: string
    constructor(_id: string, firstName: string, lastName: string){
        this._id = _id,
        this.name = firstName + ' ' + lastName
    }
}