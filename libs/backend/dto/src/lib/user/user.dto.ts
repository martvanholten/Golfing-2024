import {
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsOptional,
    IsDate
} from 'class-validator';

import { CreateUserInterface, LoginDataInterface, TeamInterface, } from '@avans-nx-workshop/shared/interfaces';

export class LoginData implements LoginDataInterface{
    email!: string;
    password!: string;
}

export class UserDto implements CreateUserInterface{
    // @IsNotEmpty()
    // _id!: string;
    @IsNotEmpty()
    firstName!: string;
    @IsNotEmpty()
    lastName!: string;
    @IsNotEmpty()
    email!: string;
    @IsNotEmpty()
    password!: string;
    @IsNotEmpty()
    role!: string;
    @IsNotEmpty()
    handicap!: number;
    @IsNotEmpty()
    age!: number;
    @IsNotEmpty()
    teams: TeamInterface[] = new Array<TeamInterface>;
}
// /**
//  * Use the `Pick` utility type to extract only the properties we want for
//  * new to-do items
//  */
// export class CreateMealDto implements ICreateMeal {
//     @IsString()
//     @IsNotEmpty()
//     title!: string;

//     @IsString()
//     @IsNotEmpty()
//     description!: string;

//     @IsString()
//     @IsNotEmpty()
//     sort!: MealSort;

//     @IsString()
//     @IsNotEmpty()
//     cook!: string;
// }

// export class UpsertMealDto implements IUpsertMeal {
//     @IsString()
//     @IsNotEmpty()
//     title!: string;

//     @IsString()
//     @IsNotEmpty()
//     description!: string;

//     @IsString()
//     @IsNotEmpty()
//     id!: string;

//     @IsBoolean()
//     @IsNotEmpty()
//     isVega!: boolean;

//     @IsDate()
//     @IsNotEmpty()
//     dateServed!: Date;

//     @IsString()
//     @IsNotEmpty()
//     sort!: MealSort;

//     @IsString()
//     @IsNotEmpty()
//     cook!: string;
// }

// export class UpdateMealDto implements IUpdateMeal {
//     @IsString()
//     @IsOptional()
//     title!: string;

//     @IsString()
//     @IsOptional()
//     description!: string;

//     @IsBoolean()
//     @IsOptional()
//     completed!: boolean;
// }
