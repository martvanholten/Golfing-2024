import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserModel, UserDocument, User } from './user.schema';
import { CreateUserInterface, UserInterface, UserInterfaceResponse } from '@avans-nx-workshop/shared/interfaces';
import { UpdateUserDto, UserDto } from '@avans-nx-workshop/backend/dto';
import { UserResponse } from './userResponse';

@Injectable()
export class UserRepo {
    private readonly logger: Logger = new Logger(UserRepo.name);
    user?: UserInterface | null;
    userResponse?: UserInterfaceResponse | null;
    userList: UserInterface[] = new Array<UserInterface>;
    userListResponse?: UserInterfaceResponse[];

    constructor(
        @InjectModel(UserModel.name) private userModel: Model<UserDocument>
    ) {}

    async findAll(): Promise<UserInterfaceResponse[]>{
        this.userListResponse = new Array<UserInterfaceResponse>
        this.userList = await this.userModel.find().exec();
        this.userList.forEach(fullUser => {
            this.userListResponse!.push(new UserResponse(
                fullUser._id,
                fullUser.firstName,
                fullUser.lastName,
                fullUser.email,
                fullUser.role,
                fullUser.handicap,
                fullUser.age
            ))
        });
        return this.userListResponse
    }

    async findOne(_id: string): Promise<UserInterfaceResponse | null>{
        this.user = await this.userModel.findOne({ _id }).exec();
        this.logger.verbose("FindOne user age: " + this.user!.age)
        if(this.user != null){
            this.userResponse = new UserResponse(
                this.user._id,
                this.user.firstName,
                this.user.lastName,
                this.user.email,
                this.user.role,
                this.user.handicap,
                this.user.age
            )
            return this.userResponse
        }
        return null
    }

    async findOneByEmail(email: string): Promise<UserInterfaceResponse | null>{
        this.user = await this.userModel.findOne({ email }).exec();
        if(this.user !== null){
            this.userResponse = new UserResponse(
                this.user._id,
                this.user.firstName,
                this.user.lastName,
                this.user.email,
                this.user.role,
                this.user.handicap,
                this.user.age
            )
            return this.userResponse
        }
        return null
    }

    async findOneWithPasswordByEmail(email: string): Promise<UserInterface | null>{
        return this.userModel.findOne({ email:email }).exec();
    }

    async delteOne(user: UserInterface): Promise<void>{
        this.userModel.deleteOne(user).exec();
    }

    async create(user: UserDto): Promise<UserInterfaceResponse | null>{
        this.user = await this.userModel.create(user);
        if(this.user !== null){
            this.userResponse = new UserResponse(
                this.user._id,
                this.user.firstName,
                this.user.lastName,
                this.user.email,
                this.user.role,
                this.user.handicap,
                this.user.age
            )
            return this.userResponse
        }
        return null
    }

    async update(_id: string, user: UpdateUserDto): Promise<UserInterface | null>{
        return await this.userModel.findByIdAndUpdate({ _id }, user);
    }
}
