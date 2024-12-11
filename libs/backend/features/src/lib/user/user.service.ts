import { HttpException, Injectable, Logger } from '@nestjs/common';
import { User } from './user.schema';
import { ApiResponse, ApiResponseInterface, CreateUserInterface, LoginDataInterface, UserInterface } from '@avans-nx-workshop/shared/interfaces';
import { UserRepo } from './user.repo';
import { UserDto } from '@avans-nx-workshop/backend/dto';

@Injectable()
export class UserService {
    private readonly logger: Logger = new Logger(UserService.name);
    user?: UserInterface | null;
    userList: UserInterface[] = new Array<UserInterface>;
    response?: ApiResponseInterface<UserInterface | UserInterface[]> | null;

    constructor(
        private readonly userRepo: UserRepo
    ) {}

    async findAll(): Promise<ApiResponseInterface<UserInterface[]>> {
        try {
            this.userList = await this.userRepo.findAll();
            this.response = new ApiResponse<UserInterface[]>('succes', this.userList)
            return this.response as ApiResponse<UserInterface[]>;
        } catch (error) {
            this.response = new ApiResponse<UserInterface[]>('error')
            return this.response as ApiResponse<UserInterface[]>;
        }
    }

    async findOne(_id: string): Promise<ApiResponseInterface<UserInterface>> {
        try {
            this.user = await this.userRepo.findOne(_id);
            if(this.user !== null){
                this.response = new ApiResponse<UserInterface>('succes', this.user)
                return this.response as ApiResponse<UserInterface>;
            }else{
                this.response = new ApiResponse<UserInterface>('not found')
                return this.response as ApiResponse<UserInterface>;
            }
        } catch (error) {
            this.response = new ApiResponse<UserInterface>('error')
            return this.response as ApiResponse<UserInterface>;
        }
    }

    async findOneByEmail(email: string): Promise<ApiResponseInterface<UserInterface>> {
        try {
            this.user = await this.userRepo.findOneByEmail(email);
            if(this.user !== null){
                this.response = new ApiResponse<UserInterface>('succes', this.user)
                return this.response as ApiResponse<UserInterface>;
            }else{
                this.response = new ApiResponse<UserInterface>('not found')
                return this.response as ApiResponse<UserInterface>;
            }
        } catch (error) {
            this.response = new ApiResponse<UserInterface>('error')
            return this.response as ApiResponse<UserInterface>;
        }
    }

    async create(user: UserDto): Promise<ApiResponseInterface<UserInterface>> {
        try {
            const newUser = await this.userRepo.create(user);
            if(newUser !== null){
                this.response = new ApiResponse<UserInterface>('succes')
                return this.response as ApiResponse<UserInterface>;
            }else{
                this.response = new ApiResponse<UserInterface>('error')
                return this.response as ApiResponse<UserInterface>;
            }            
        } catch (error) {
            this.response = new ApiResponse<UserInterface>('error')
            return this.response as ApiResponse<UserInterface>;
        }
    }

    async update(_id: string, user: CreateUserInterface): Promise<ApiResponseInterface<UserInterface>> {
        try {
            this.user = await this.userRepo.update(_id, user);
            if(this.user !== null){
                this.response = new ApiResponse<UserInterface>('succes', this.user)
                return this.response as ApiResponse<UserInterface>;
            }else{
                this.response = new ApiResponse<UserInterface>('not found')
                return this.response as ApiResponse<UserInterface>;
            }
        } catch (error) {
            this.response = new ApiResponse<UserInterface>('error')
            return this.response as ApiResponse<UserInterface>;
        }
    }

    async login(loginData: LoginDataInterface): Promise<ApiResponseInterface<UserInterface>>{
        try {
            this.user = await this.userRepo.findOneByEmail(loginData.email);
            if(this.user instanceof User){
                if(this.user.password === loginData.password){
                    this.response = new ApiResponse<UserInterface>('succes', this.user)
                    return this.response as ApiResponse<UserInterface>;
                }
                this.response = new ApiResponse<UserInterface>('wrong password')
                return this.response as ApiResponse<UserInterface>;
            }else{
                this.response = new ApiResponse<UserInterface>('not found')
                return this.response as ApiResponse<UserInterface>;
            }            
        } catch (error) {
            this.response = new ApiResponse<UserInterface>('error')
            return this.response as ApiResponse<UserInterface>;
        }
    }
}
