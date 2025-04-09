import { HttpException, Injectable, Logger } from '@nestjs/common';
import { User } from './user.schema';
import { ApiResponse, ApiResponseInterface, LoginDataInterface, TeamInterface, UserInterface, UserInterfaceResponse } from '@avans-nx-workshop/shared/interfaces';
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
    user?: UserInterfaceResponse | null;
    fullUser?: UserInterface | null;
    userList: UserInterfaceResponse[] = new Array<UserInterfaceResponse>;
    userListResponse: UserInterfaceResponse[] = new Array<UserInterfaceResponse>;
    response?: ApiResponseInterface<UserInterfaceResponse | UserInterface | UserInterfaceResponse[]> | null;

    constructor(
        private readonly userRepo: UserRepo,
        private readonly teamService: TeamService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async findAll(): Promise<ApiResponseInterface<UserInterfaceResponse[]>> {
        try {
            this.userList = await this.userRepo.findAll();
            this.response = new ApiResponse<UserInterfaceResponse[]>('succes', this.userList)
            return this.response as ApiResponse<UserInterfaceResponse[]>;
        } catch (error) {
            this.response = new ApiResponse<UserInterfaceResponse[]>('error')
            return this.response as ApiResponse<UserInterfaceResponse[]>;
        }
    }

    async findOne(_id: string): Promise<ApiResponseInterface<UserInterfaceResponse>> {
        try {
            this.user = await this.userRepo.findOne(_id);
            if(this.user !== null){
                this.response = new ApiResponse<UserInterfaceResponse>('succes', this.user);
                return this.response as ApiResponse<UserInterfaceResponse>;
            }else{
                this.response = new ApiResponse<UserInterfaceResponse>('user not found');
                return this.response as ApiResponse<UserInterfaceResponse>;
            }
        } catch (error) {
            this.response = new ApiResponse<UserInterfaceResponse>('error');
            return this.response as ApiResponse<UserInterfaceResponse>;
        }
    }

    async create(user: UserDto): Promise<ApiResponseInterface<UserInterfaceResponse>> {
        try {
            if(await this.userRepo.findOneByEmail(user.email) === null){
                user.password = await this.hashPassword(user.password);
                this.user = await this.userRepo.create(user);
                if(this.user !== null){
                    this.response = new ApiResponse<UserInterfaceResponse>('succes', this.user);
                    return this.response as ApiResponse<UserInterfaceResponse>;
                }else{
                    this.response = new ApiResponse<UserInterfaceResponse>('error');
                    return this.response as ApiResponse<UserInterfaceResponse>;
                } 
            }else{
                this.response = new ApiResponse<UserInterfaceResponse>('user already exists');
                return this.response as ApiResponse<UserInterfaceResponse>;
            }         
        } catch (error) {
            this.response = new ApiResponse<UserInterfaceResponse>('error');
            return this.response as ApiResponse<UserInterfaceResponse>;
        }
    }

    async delete(user: UserInterface): Promise<ApiResponseInterface<UserInterfaceResponse>> {
        try {
            var teamList = (await this.teamService.findAll()).results as TeamInterface[];
            teamList?.forEach(team => {
                if(team.golfers.includes(user)){
                    team.golfers.slice(team.golfers.indexOf(user), 1)
                    this.teamService.update(team.teamCaptain, team)
                }
            });
            this.userRepo.delteOne(user)
            this.response = new ApiResponse<UserInterfaceResponse>('succes');  
            return this.response as ApiResponse<UserInterfaceResponse>;
        } catch (error) {
            this.response = new ApiResponse<UserInterfaceResponse>('error');
            return this.response as ApiResponse<UserInterfaceResponse>;
        }
    }

    async update(_id: string, user: UpdateUserDto): 
        Promise<ApiResponseInterface<UserInterfaceResponse>> {
        try {
            user.password = await this.hashPassword(user.password!);
            this.fullUser = await this.userRepo.update(_id, user);
            if(this.fullUser !== null){
                this.response = new ApiResponse<UserInterfaceResponse>('succes', this.fullUser);
                return this.response as ApiResponse<UserInterfaceResponse>;
            }else{
                this.response = new ApiResponse<UserInterfaceResponse>('user not found');
                return this.response as ApiResponse<UserInterfaceResponse>;
            }
        } catch (error) {
            this.response = new ApiResponse<UserInterfaceResponse>('error');
            return this.response as ApiResponse<UserInterfaceResponse>;
        }
    }

    async login(loginData: LoginDataInterface): Promise<ApiResponseInterface<UserInterface>>{
        try {
            this.fullUser = await this.userRepo.findOneWithPasswordByEmail(loginData.email);
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