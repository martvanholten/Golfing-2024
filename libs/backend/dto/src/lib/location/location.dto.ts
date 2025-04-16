import {
    IsNotEmpty,
    IsNumber,
    IsString
} from 'class-validator';

import { CreateLocationInterface, GameInterface, LocationInterface, ManagerInterface } from '@avans-nx-workshop/shared/interfaces';

export class LocationDto implements CreateLocationInterface{
    @IsNotEmpty()
    @IsString()
    name!: string;
    @IsNotEmpty()
    @IsString()
    city!: string;
    @IsNotEmpty()
    @IsString()
    address!: string;
    @IsNotEmpty()
    @IsNumber()
    houseNumber!: number
    @IsNotEmpty()
    large!: boolean;
    @IsNotEmpty()
    games!: GameInterface[];
    @IsNotEmpty()
    locationManager!: ManagerInterface;
}

export class UpdateLocationDto implements LocationInterface{
    @IsNotEmpty()
    @IsString()
    _id!: string;
    @IsNotEmpty()
    @IsString()
    name!: string;
    @IsNotEmpty()
    @IsString()
    city!: string;
    @IsNotEmpty()
    @IsString()
    address!: string;
    @IsNotEmpty()
    @IsNumber()
    houseNumber!: number
    @IsNotEmpty()
    large!: boolean;
    @IsNotEmpty()
    games!: GameInterface[];
    @IsNotEmpty()
    locationManager!: ManagerInterface;
}