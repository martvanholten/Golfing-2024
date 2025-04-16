import { Injectable, Logger } from '@nestjs/common';
import { ApiResponse, ApiResponseInterface, TeamInterface, UserTeamInterface } from '@avans-nx-workshop/shared/interfaces';
import { TeamRepo } from './team.repo';
import { TeamDto, UpdateUserDto } from '@avans-nx-workshop/backend/dto';
import { UserRepo } from '../user/user.repo';
import { ConfigType} from '@nestjs/config'

@Injectable()
export class TeamService {
    private readonly logger: Logger = new Logger(TeamService.name);
    team?: TeamInterface | null;
    teamList: TeamInterface[] = new Array<TeamInterface>;
    response?: ApiResponseInterface<TeamInterface | TeamInterface[]> | null;
    configType: ConfigType<() => {}> = {}

    constructor(
        private readonly teamRepo: TeamRepo,
        private readonly userRepo: UserRepo
    ) {}

    async findAll(): Promise<ApiResponseInterface<TeamInterface[]>> {
        try {
            this.teamList = await this.teamRepo.findAll();
            this.response = new ApiResponse<TeamInterface[]>('succes', this.teamList)
            return this.response as ApiResponseInterface<TeamInterface[]>;
        } catch (error) {
            this.response = new ApiResponse<TeamInterface[]>('error')
            return this.response as ApiResponseInterface<TeamInterface[]>;
        }
    }

    async findOne(_id: string): Promise<ApiResponseInterface<TeamInterface>> {
        try {
            this.team = await this.teamRepo.findOne(_id);
            if(this.team !== null){
                this.response = new ApiResponse<TeamInterface>('succes', this.team)
                return this.response as ApiResponseInterface<TeamInterface>;
            }else{
                this.response = new ApiResponse<TeamInterface>('team not found')
                return this.response as ApiResponseInterface<TeamInterface>;
            }
        } catch (error) {
            this.response = new ApiResponse<TeamInterface>('error')
            return this.response as ApiResponseInterface<TeamInterface>;
        }
    }

    async findOneByName(name: string): Promise<ApiResponseInterface<TeamInterface>> {
        try {
            this.team = await this.teamRepo.findOneByName(name);
            if(this.team !== null){
                this.response = new ApiResponse<TeamInterface>('succes', this.team)
                return this.response as ApiResponseInterface<TeamInterface>;
            }else{
                this.response = new ApiResponse<TeamInterface>('team not found')
                return this.response as ApiResponseInterface<TeamInterface>;
            }
        } catch (error) {
            this.response = new ApiResponse<TeamInterface>('error')
            return this.response as ApiResponseInterface<TeamInterface>;
        }
    }

    async findTopFive(): Promise<ApiResponseInterface<TeamInterface[]>> {
        try {
            this.teamList.length = 0;
            (await this.teamRepo.findAll()).forEach(team => {
                if(team.rank < 6){
                    this.teamList.push(team)
                }
            });            
            this.response = new ApiResponse<TeamInterface[]>('succes', this.teamList)
            return this.response as ApiResponseInterface<TeamInterface[]>;
        } catch (error) {
            this.response = new ApiResponse<TeamInterface[]>('error')
            return this.response as ApiResponseInterface<TeamInterface[]>;
        }
    }

    async create(team: TeamDto): Promise<ApiResponseInterface<TeamInterface>> {
        try {
            this.team = await this.teamRepo.findOneByName(team.name)
            if(this.team?.name === team.name){
                this.response = new ApiResponse<TeamInterface>('team already exists')
                return this.response as ApiResponseInterface<TeamInterface>;
            }else{
                const createdteam = await this.teamRepo.create(team);
                if(createdteam !== null){
                    this.response = new ApiResponse<TeamInterface>('succes')
                    return this.response as ApiResponseInterface<TeamInterface>;
                }else{
                    this.response = new ApiResponse<TeamInterface>('error')
                    return this.response as ApiResponseInterface<TeamInterface>;
                }     
            }       
        } catch (error) {
            this.response = new ApiResponse<TeamInterface>('error')
            return this.response as ApiResponseInterface<TeamInterface>;
        }
    }

    async update(userId: string, team: TeamInterface): Promise<ApiResponseInterface<TeamInterface>> {
        try {
            this.team = await this.teamRepo.findOne(team._id)
            if(this.team !== null){
                if(this.team.teamCaptain === userId){
                    this.team = await this.teamRepo.update(team._id, team);
                    if(this.team){
                        this.response = new ApiResponse<TeamInterface>('succes', this.team)
                        return this.response as ApiResponseInterface<TeamInterface>;
                    }else{
                        this.response = new ApiResponse<TeamInterface>('error')
                        return this.response as ApiResponseInterface<TeamInterface>;
                    }
                }else{
                    this.response = new ApiResponse<TeamInterface>('not the team captain')
                    return this.response as ApiResponseInterface<TeamInterface>;
                }                
            }else{
                this.response = new ApiResponse<TeamInterface>('team not found')
                return this.response as ApiResponseInterface<TeamInterface>;
            }
        } catch (error) {
            this.response = new ApiResponse<TeamInterface>('error')
            return this.response as ApiResponseInterface<TeamInterface>;
        }
    }

    async delete(_id: string, userId: string): Promise<ApiResponseInterface<TeamInterface>> {
        try {
            this.team = await this.teamRepo.findOne(_id)

            if(this.team !== null){
                if(this.team.golfers.length < 1){
                    if(this.team.teamCaptain === userId){
                        await this.teamRepo.delete(_id);
                        this.response = new ApiResponse<TeamInterface>('succes')
                        return this.response as ApiResponseInterface<TeamInterface>;
                    }else{
                        this.response = new ApiResponse<TeamInterface>('not the team captain')
                        return this.response as ApiResponseInterface<TeamInterface>;
                    } 
                }else{
                    this.response = new ApiResponse<TeamInterface>('team has team members')
                    return this.response as ApiResponseInterface<TeamInterface>;
                }           
            }else{
                this.response = new ApiResponse<TeamInterface>('team not found')
                return this.response as ApiResponseInterface<TeamInterface>;
            }
        } catch (error) {
            this.response = new ApiResponse<TeamInterface>('error')
            return this.response as ApiResponseInterface<TeamInterface>;
        }
    }
}
