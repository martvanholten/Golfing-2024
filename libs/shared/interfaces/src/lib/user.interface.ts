import { TeamInterface } from "./team.interface";

export interface UserInterface{
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    handicap: number;
    age: number;
    teams: TeamInterface[];
}

export interface CreateUserInterface{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: string;
    handicap?: number;
    age?: number;
    teams: TeamInterface[]
}

export interface LoginDataInterface{
    email: string;
    password: string;
}