import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TeamGameInterface, TeamInterface, TeamUserInterface } from '@avans-nx-workshop/shared/interfaces';
import { IsMongoId } from 'class-validator';

export type TeamDocument = Team & Document;

@Schema()
export class Team implements TeamInterface {
    @IsMongoId()
    _id!: string;
    @Prop()
    rank!: number;
    @Prop()
    name!: string;
    @Prop()
    largeGames!: boolean;
    @Prop()
    games: TeamGameInterface[] = new Array<TeamGameInterface>;
    @Prop()
    golfers: TeamUserInterface[] = new Array<TeamUserInterface>;
    @Prop()
    teamCaptain!: string;    
}

export const TeamSchema = SchemaFactory.createForClass(Team);