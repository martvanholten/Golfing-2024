import {
    IsNotEmpty,
    IsBoolean,
    IsNumber,
    IsString
} from 'class-validator';

import { CreateTeamInterface, TeamInterface, GameInterface, UserInterface } from '@avans-nx-workshop/shared/interfaces';

export class TeamDto implements CreateTeamInterface{
    @IsNotEmpty()
    @IsNumber()
    rank!: number;
    @IsNotEmpty()
    @IsString()
    name!: string;
    @IsNotEmpty()
    largeGames!: boolean;
    @IsNotEmpty()
    games!: GameInterface[];
    @IsNotEmpty()
    golfers!: UserInterface[];
    @IsNotEmpty()
    @IsString()
    teamCaptain!: string;
}

export class UpdateTeamDto implements TeamInterface{
    @IsNotEmpty()
    @IsString()
    _id!: string;
    @IsNotEmpty()
    @IsNumber()
    rank!: number;
    @IsNotEmpty()
    @IsString()
    name!: string;
    @IsNotEmpty()
    @IsBoolean()
    largeGames!: boolean;
    @IsNotEmpty()
    games!: GameInterface[];
    @IsNotEmpty()
    golfers!: UserInterface[];
    @IsNotEmpty()
    @IsString()
    teamCaptain!: string;
}