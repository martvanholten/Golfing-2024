import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./user.schema";
import { Model } from "mongoose";

@Injectable()
export class UserRepo{
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

    async find(): Promise<User[]>{
        return this.userModel.find();
    }
}