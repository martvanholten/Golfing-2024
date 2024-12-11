import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserModel, UserDocument, User } from './user.schema';
import { CreateUserInterface, UserInterface, UserInterfaceResponse } from '@avans-nx-workshop/shared/interfaces';
import { UserDto } from '@avans-nx-workshop/backend/dto';

@Injectable()
export class UserRepo {
    private readonly logger: Logger = new Logger(UserRepo.name);
    private user?: UserInterfaceResponse | null;

    constructor(
        @InjectModel(UserModel.name) private userModel: Model<UserDocument>
    ) {}

    async findAll(): Promise<UserInterface[]>{
        return this.userModel.find().exec();
    }

    async findOne(_id: string): Promise<UserInterface | null>{
        return this.userModel.findOne({ _id }).exec();
    }

    async findOneByEmail(email: string): Promise<UserInterface | null>{
        return this.userModel.findOne({ email }).exec();
    }

    async create(user: UserDto): Promise<UserInterface | null>{
        return this.userModel.create(user);
    }

    async update(_id: string, user: CreateUserInterface): Promise<UserInterface | null>{
        return this.userModel.findByIdAndUpdate({ _id }, user);
    }
}
