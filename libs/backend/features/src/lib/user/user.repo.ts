import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserModel, UserDocument } from './user.schema';
import { UserInterface } from '@avans-nx-workshop/shared/interfaces';
import { UpdateUserDto, UserDto } from '@avans-nx-workshop/backend/dto';

@Injectable()
export class UserRepo {
    private readonly logger: Logger = new Logger(UserRepo.name);
    user?: UserInterface | null;
    userList: UserInterface[] = new Array<UserInterface>;

    constructor(
        @InjectModel(UserModel.name) private userModel: Model<UserDocument>
    ) {}

    async findAll(): Promise<UserInterface[]>{
        return this.userList = await this.userModel.find().exec();
    }

    async findOne(_id: string): Promise<UserInterface | null>{
        this.user = await this.userModel.findOne({ _id }).exec();
        if(this.user != null){
            return this.user
        }
        return null
    }

    async findOneByEmail(email: string): Promise<UserInterface | null>{
        return this.userModel.findOne({ email:email }).exec();
    }

    async delteOne(user: UserInterface): Promise<void>{
        this.userModel.deleteOne(user).exec();
    }

    async create(user: UserDto): Promise<UserInterface | null>{
        this.user = await this.userModel.create(user);
        if(this.user !== null){
            return this.user
        }
        return null
    }

    async update(_id: string, user: UpdateUserDto): Promise<UserInterface | null>{
        return await this.userModel.findByIdAndUpdate({ _id }, user);
    }
}
