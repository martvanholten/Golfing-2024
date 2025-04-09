import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GameInterface, LocationInterface, TeamInterface, UserInterface, } from '@avans-nx-workshop/shared/interfaces';
import { IsMongoId } from 'class-validator';

// export type GameDocument = Game & Document;

// @Schema()
// export class Game implements GameInterface {
// }

export const LocationSchema = SchemaFactory.createForClass(Location);