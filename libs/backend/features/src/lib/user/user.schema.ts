import { TeamInterface, UserInterface } from "@avans-nx-workshop/shared/interfaces";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { IsMongoId } from "class-validator";
import { Document } from "mongoose"

export type UserDocument = User & Document

@Schema()
export class User implements UserInterface{
    @IsMongoId()
    _id!: string;
    @Prop()
    firstName!: string;
    @Prop()
    lastName!: string;
    @Prop()
    email!: string;
    @Prop()
    password!: string;
    @Prop()
    role!: string;
    @Prop()
    handicap!: number;
    @Prop()
    age!: number;
    @Prop()
    teams: TeamInterface[] = new Array<TeamInterface>;
}

export const UserSchema = SchemaFactory.createForClass(User);