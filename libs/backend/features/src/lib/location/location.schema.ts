import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GameInterface, LocationInterface, ManagerInterface, TeamInterface, UserInterface, } from '@avans-nx-workshop/shared/interfaces';
import { IsMongoId } from 'class-validator';

export type LocationDocument = Location & Document;

@Schema()
export class Location implements LocationInterface {
    @IsMongoId()
    _id!: string;
    @Prop()
    name!: string;
    @Prop()
    city!: string;
    @Prop()
    address!: string;
    @Prop()
    houseNumber!: number;
    @Prop()
    large!: boolean;
    @Prop()
    games: GameInterface[] = new Array<GameInterface>;
    @Prop({ type: Object})
    locationManager!: ManagerInterface;
}

export const LocationSchema = SchemaFactory.createForClass(Location);