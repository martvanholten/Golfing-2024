import { TeamInterface, UserInterfaceResponse } from "@avans-nx-workshop/shared/interfaces";

export class UserResponse implements UserInterfaceResponse{
    _id!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    role!: string;
    handicap!: number;
    age!: number;
    teams: TeamInterface[] = new Array<TeamInterface>;

    constructor(_id: string, firstName: string, lastName: string, email: string, role:string, handicap: number, age: number){
        this._id = _id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.handicap = handicap;
        this.age = age;
    }
}