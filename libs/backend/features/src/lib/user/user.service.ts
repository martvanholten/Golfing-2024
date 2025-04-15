import { HttpException, Injectable, Logger } from '@nestjs/common';
import { User } from './user.schema';
import { ApiResponse, ApiResponseInterface, LoginDataInterface, TeamInterface, UserInterface } from '@avans-nx-workshop/shared/interfaces';
import { UserRepo } from './user.repo';
import { UpdateUserDto, UserDto } from '@avans-nx-workshop/backend/dto';
import { hash, compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { TeamService } from '../team/team.service';

@Injectable()
export class UserService {
    private readonly logger: Logger = new Logger(UserService.name);
    user?: UserInterface | null;
    fullUser?: UserInterface | null;
    userList: UserInterface[] = new Array<UserInterface>;
    response?: ApiResponseInterface<UserInterface | UserInterface[]> | null;

    constructor(
        private readonly userRepo: UserRepo,
        private readonly teamService: TeamService,
        private jwtService: JwtService,
        private configService: ConfigService
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
                this.response = new ApiResponse<UserInterface>('succes', this.user);
                return this.response as ApiResponse<UserInterface>;
            }else{
                this.response = new ApiResponse<UserInterface>('user not found');
                return this.response as ApiResponse<UserInterface>;
            }
        } catch (error) {
            this.response = new ApiResponse<UserInterface>('error');
            return this.response as ApiResponse<UserInterface>;
        }
    }

    async findOneByEmail(email:string): Promise<ApiResponseInterface<UserInterface>>{
        try {
            this.user = await this.userRepo.findOneByEmail(email);
            if(this.user !== null){
                this.response = new ApiResponse<UserInterface>('succes', this.user);
                return this.response as ApiResponse<UserInterface>;
            }else{
                this.response = new ApiResponse<UserInterface>('user not found');
                return this.response as ApiResponse<UserInterface>;
            }
        } catch (error) {
            this.response = new ApiResponse<UserInterface>('error');
            return this.response as ApiResponse<UserInterface>;
        }
    }

    async create(user: UserDto): Promise<ApiResponseInterface<UserInterface>> {
        try {
            var exists = false
            this.userList = await this.userRepo.findAll()
            this.userList.forEach(u =>{
                if(u.email === user.email){
                    exists = true
                }
            });
            if(exists){
                this.response = new ApiResponse<UserInterface>('user already exists');
                return this.response as ApiResponse<UserInterface>;
            }else{
                if(await this.userRepo.findOneByEmail(user.email) === null){
                    user.password = await this.hashPassword(user.password);
                    this.user = await this.userRepo.create(user);
                    if(this.user !== null){
                        this.response = new ApiResponse<UserInterface>('succes', this.user);
                        return this.response as ApiResponse<UserInterface>;
                    }else{
                        this.response = new ApiResponse<UserInterface>('error');
                        return this.response as ApiResponse<UserInterface>;
                    } 
                }else{
                    this.response = new ApiResponse<UserInterface>('user already exists');
                    return this.response as ApiResponse<UserInterface>;
                }       
            }  
        } catch (error) {
            this.response = new ApiResponse<UserInterface>('error');
            return this.response as ApiResponse<UserInterface>;
        }
    }

    async delete(user: UserInterface): Promise<ApiResponseInterface<UserInterface>> {
        try {
            this.userRepo.delteOne(user)
            this.response = new ApiResponse<UserInterface>('succes');  
            return this.response as ApiResponse<UserInterface>;
        } catch (error) {
            this.response = new ApiResponse<UserInterface>('error');
            return this.response as ApiResponse<UserInterface>;
        }
    }

    async update(_id: string, user: UpdateUserDto): 
        Promise<ApiResponseInterface<UserInterface>> {
        try {
            console.log(user)
            user.password = await this.hashPassword(user.password!);
            this.fullUser = await this.userRepo.update(_id, user);
            if(this.fullUser !== null){
                this.response = new ApiResponse<UserInterface>('succes', this.fullUser);
                return this.response as ApiResponse<UserInterface>;
            }else{
                this.response = new ApiResponse<UserInterface>('user not found');
                return this.response as ApiResponse<UserInterface>;
            }
        } catch (error) {
            this.response = new ApiResponse<UserInterface>('error');
            return this.response as ApiResponse<UserInterface>;
        }
    }

    async login(loginData: LoginDataInterface): Promise<ApiResponseInterface<UserInterface>>{
        try {
            this.fullUser = await this.userRepo.findOneByEmail(loginData.email);
            if(this.fullUser !== null){
                if(await compare(loginData.password, this.fullUser.password)){
                    this.response = new ApiResponse<UserInterface>
                        ('succes', this.fullUser, await this.getToken(this.fullUser));
                    return this.response as ApiResponse<UserInterface>;
                }else{
                    this.response = new ApiResponse<UserInterface>('wrong password');
                    return this.response as ApiResponse<UserInterface>;
                }
            }else{
                this.response = new ApiResponse<UserInterface>('user not found');
                return this.response as ApiResponse<UserInterface>;
            }            
        } catch (error) {
            this.response = new ApiResponse<UserInterface>('error');
            return this.response as ApiResponse<UserInterface>;
        }
    }

    async hashPassword(password: string): Promise<string>{
        return hash(password, 14);
    }

    async getToken(user: User): Promise<string>{
        return this.jwtService.signAsync(
            { sub: user.email, role: user.role },
            { 
                secret:  environment.JWT_ACCESS_TOKEN_SECRET, 
                expiresIn: environment.JWT_ACCESS_TOKEN_EXP_TIME 
            }
        )
    }
}