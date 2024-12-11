import { TeamInterface } from "./team.interface";

//Could make a interface with id and name to add to teams
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

export interface UserInterfaceResponse{
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
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