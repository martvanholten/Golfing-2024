import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsEmail
} from 'class-validator';

import { CreateUserInterface, LoginDataInterface, UserInterface, UserTeamInterface, } from '@avans-nx-workshop/shared/interfaces';

export class LoginData implements LoginDataInterface{
    email!: string;
    password!: string;
}

export class UserDto implements CreateUserInterface{
    @IsNotEmpty()
    @IsString()
    firstName!: string;
    @IsNotEmpty()
    @IsString()
    lastName!: string;
    @IsNotEmpty()
    @IsEmail()
    email!: string;
    @IsNotEmpty()
    @IsString()
    password!: string;
    @IsNotEmpty()
    @IsString()
    role!: string;
    @IsNotEmpty()
    @IsNumber()
    handicap!: number;
    @IsNotEmpty()
    @IsNumber()
    age!: number;
    @IsNotEmpty()
    teams: UserTeamInterface[] = new Array<UserTeamInterface>;
}

export class UpdateUserDto implements UserInterface{
    @IsNotEmpty()
    @IsString()
    _id!: string;
    @IsNotEmpty()
    @IsString()
    firstName!: string;
    @IsNotEmpty()
    @IsString()
    lastName!: string;
    @IsNotEmpty()
    @IsEmail()
    email!: string;
    @IsNotEmpty()
    @IsString()
    password!: string;
    @IsNotEmpty()
    @IsString()
    role!: string;
    @IsNotEmpty()
    @IsNumber()
    handicap!: number;
    @IsNotEmpty()
    @IsNumber()
    age!: number;
    @IsNotEmpty()
    teams!: UserTeamInterface[];
}