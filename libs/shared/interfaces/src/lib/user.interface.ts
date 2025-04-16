import { TeamInterface, UserTeamInterface } from "./team.interface";

export interface UserInterface{
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    handicap: number;
    age: number;
    teams: UserTeamInterface[];
}

export interface CreateUserInterface{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: string;
    handicap?: number;
    age?: number;
    teams: UserTeamInterface[]
}

export interface LoginDataInterface{
    email: string;
    password: string;
}

export interface ManagerInterface{
    _id: string
    name: string
}

export interface TeamUserInterface{
    lastName: string
    firstName: string
    email: string
}