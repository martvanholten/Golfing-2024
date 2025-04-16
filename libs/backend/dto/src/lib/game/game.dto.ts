import {
    IsNotEmpty,
    IsNumber,
    IsString,
    IsOptional,
} from 'class-validator';

import { GameInterface, ManagerInterface, GameTeamInterface } from '@avans-nx-workshop/shared/interfaces';

export class GameDto implements GameInterface{
    @IsOptional()
    @IsString()
    winner?: string | undefined;
    @IsNotEmpty()
    date!: Date;
    @IsNotEmpty()
    @IsNumber()
    holes!: number;
    @IsNotEmpty()
    @IsString()
    name!: string;
    @IsNotEmpty()
    @IsString()
    location!: string;
    @IsNotEmpty()
    teams!: GameTeamInterface[];
    @IsNotEmpty()
    gameManager!: ManagerInterface;
}