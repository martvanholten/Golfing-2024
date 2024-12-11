import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Team } from './team.schema';
import { ApiResponse, ApiResponseInterface, CreateTeamInterface, TeamInterface } from '@avans-nx-workshop/shared/interfaces';
import { TeamRepo } from './team.repo';

@Injectable()
export class TeamService {
    private readonly logger: Logger = new Logger(TeamService.name);
    team?: TeamInterface | null;
    teamList: TeamInterface[] = new Array<TeamInterface>;
    response?: ApiResponseInterface<TeamInterface | TeamInterface[]> | null;

    constructor(
        private readonly teamRepo: TeamRepo
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
                this.response = new ApiResponse<TeamInterface>('not found')
                return this.response as ApiResponseInterface<TeamInterface>;
            }
        } catch (error) {
            this.response = new ApiResponse<TeamInterface>('error')
            return this.response as ApiResponseInterface<TeamInterface>;
        }
    }

    async findTopFive(): Promise<ApiResponseInterface<TeamInterface[]>> {
        // try {
            this.teamList = await this.teamRepo.findTopFive();
            this.response = new ApiResponse<TeamInterface[]>('succes', this.teamList)
            return this.response as ApiResponseInterface<TeamInterface[]>;
        // } catch (error) {
        //     this.response = new ApiResponse<TeamInterface[]>('error')
        //     return this.response as ApiResponseInterface<TeamInterface[]>;
        // }
    }

    async create(team: CreateTeamInterface): Promise<ApiResponseInterface<TeamInterface>> {
        try {
            const createdteam = await this.teamRepo.create(team);
            if(createdteam !== null){
                this.response = new ApiResponse<TeamInterface>('succes')
                return this.response as ApiResponseInterface<TeamInterface>;
            }else{
                this.response = new ApiResponse<TeamInterface>('error')
                return this.response as ApiResponseInterface<TeamInterface>;
            }            
        } catch (error) {
            this.response = new ApiResponse<TeamInterface>('error')
            return this.response as ApiResponseInterface<TeamInterface>;
        }
    }

    async update(_id: string, team: CreateTeamInterface): Promise<ApiResponseInterface<TeamInterface>> {
        try {
            this.team = await this.teamRepo.update(_id, team);
            if(this.team !== null){
                this.response = new ApiResponse<TeamInterface>('succes', this.team)
                return this.response as ApiResponseInterface<TeamInterface>;
            }else{
                this.response = new ApiResponse<TeamInterface>('not found')
                return this.response as ApiResponseInterface<TeamInterface>;
            }
        } catch (error) {
            this.response = new ApiResponse<TeamInterface>('error')
            return this.response as ApiResponseInterface<TeamInterface>;
        }
    }
}
