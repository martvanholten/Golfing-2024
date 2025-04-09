import {
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsOptional,
    IsDate
} from 'class-validator';

import { CreateTeamInterface, GameInterface, UserInterface } from '@avans-nx-workshop/shared/interfaces';

export class TeamDto implements CreateTeamInterface{
    // @IsNotEmpty()
    // _id = '123';
    @IsNotEmpty()
    rank!: number;
    @IsNotEmpty()
    name!: string;
    @IsNotEmpty()
    largeGames!: boolean;
    @IsNotEmpty()
    games: GameInterface[] = new Array<GameInterface>;
    @IsNotEmpty()
    golfers!: UserInterface[]
    @IsNotEmpty()
    teamCaptain!: string;
}