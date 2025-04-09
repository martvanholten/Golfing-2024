import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ApiResponse, ApiResponseInterface, GameInterface, LocationInterface, TeamInterface } from '@avans-nx-workshop/shared/interfaces';
import { LocationRepo } from './location.repo';
import { TeamService } from '@avans-nx-workshop/backend/features';

@Injectable()
export class LocationService {
    private readonly logger: Logger = new Logger(LocationService.name);
    location?: LocationInterface | null;
    locationList: LocationInterface[] = new Array<LocationInterface>;
    game?: GameInterface | null;
    gameList: GameInterface[] = new Array<GameInterface>;
    response?: ApiResponseInterface<LocationInterface | LocationInterface[] | GameInterface | GameInterface[]> | null;
    team?: TeamInterface | null;

    constructor(
        private readonly locationRepo: LocationRepo,
        private readonly teamService: TeamService
    ) {}

    async findAll(): Promise<ApiResponseInterface<LocationInterface[]>> {
        try {
            this.locationList = await this.locationRepo.findAll();
            this.response = new ApiResponse<LocationInterface[]>('succes', this.locationList)
            return this.response as ApiResponseInterface<LocationInterface[]>;
        } catch (error) {
            this.response = new ApiResponse<LocationInterface[]>('error')
            return this.response as ApiResponseInterface<LocationInterface[]>;
        }
    }

    async findOne(_id: string): Promise<ApiResponseInterface<LocationInterface>> {
        try {
            this.location = await this.locationRepo.findOne(_id);
            if(this.location !== null){
                this.response = new ApiResponse<LocationInterface>('succes', this.location)
                return this.response as ApiResponseInterface<LocationInterface>;
            }else{
                this.response = new ApiResponse<LocationInterface>('location not found')
                return this.response as ApiResponseInterface<LocationInterface>;
            }
        } catch (error) {
            this.response = new ApiResponse<LocationInterface>('error')
            return this.response as ApiResponseInterface<LocationInterface>;
        }
    }

    async findAllGames(): Promise<ApiResponseInterface<GameInterface[]>> {
        try {
            this.gameList = await this.locationRepo.findAllGames();
            this.response = new ApiResponse<GameInterface[]>('succes', this.gameList)
            return this.response as ApiResponseInterface<GameInterface[]>;
        } catch (error) {
            this.response = new ApiResponse<GameInterface[]>('error')
            return this.response as ApiResponseInterface<GameInterface[]>;
        }
    }

    async findAllLocationGames(_id: string): Promise<ApiResponseInterface<GameInterface[]>> {
        try {
            this.gameList = await this.locationRepo.findAllLocationGames(_id);
            this.response = new ApiResponse<GameInterface[]>('succes', this.gameList)
            return this.response as ApiResponseInterface<GameInterface[]>;
        } catch (error) {
            this.response = new ApiResponse<GameInterface[]>('error')
            return this.response as ApiResponseInterface<GameInterface[]>;
        }
    }

    async findOneGame(name: string, gameName: string): Promise<ApiResponseInterface<GameInterface>> {
        try {
            this.game = await this.locationRepo.findOneGame(name, gameName);
            if(this.game !== null && this.game !== undefined){
                this.response = new ApiResponse<GameInterface>('succes', this.game)
                return this.response as ApiResponseInterface<GameInterface>;
            }else{
                this.response = new ApiResponse<GameInterface>('game not found')
                return this.response as ApiResponseInterface<GameInterface>;
            }
        } catch (error) {
            this.response = new ApiResponse<GameInterface>('error')
            return this.response as ApiResponseInterface<GameInterface>;
        }
    }

    async findGamesThisWeek(): Promise<ApiResponseInterface<GameInterface[]>> {
        try {
            this.gameList.length = 0;
            this.locationList = await this.locationRepo.findAll();
            this.locationList.forEach(location => {
                location.games.forEach(game => {
                    if(this.isDateInThisWeek(game.date)){
                        this.gameList.push(game)
                    }
                })
            })
            this.response = new ApiResponse<GameInterface[]>('succes', this.gameList)
            return this.response as ApiResponseInterface<GameInterface[]>;
        } catch (error) {
            this.response = new ApiResponse<GameInterface[]>('error')
            return this.response as ApiResponseInterface<GameInterface[]>;
        }
    }

    async updateGame( name: string, gameName: string, teamId: string, userId: string): Promise<ApiResponseInterface<LocationInterface>> {
        try {
            this.response = await this.findOne(name);
            if(this.response.results != null || this.response.results != undefined){
                this.location = this.response.results as LocationInterface
                this.response = await this.findOneGame(name, gameName);
                this.game = this.response.results as GameInterface;
                if((this.game !== null || this.game !== undefined) && this.game.name === gameName){
                    this.team = (await this.teamService.findOne(teamId)).results as TeamInterface;
                    if(this.team !== null && this.team.teamCaptain === userId){
                        this.game.teams.push(this.team)
                        this.locationRepo.updateOneGame(this.location, this.game);
                        this.response.message = 'succes';
                        this.response.results = this.location;
                        return this.response as ApiResponseInterface<LocationInterface>;
                    }else{
                        this.response.message = 'team not found with the user as captain';
                        return this.response as ApiResponseInterface<LocationInterface>;
                    }
                }else{
                    return this.response as ApiResponseInterface<LocationInterface>;
                }
            }else{
                return this.response as ApiResponseInterface<LocationInterface>;
            }
        } catch (error) {
            this.response = new ApiResponse<LocationInterface>('error')
            return this.response as ApiResponseInterface<LocationInterface>;
        }
    }

    private isDateInThisWeek(date: Date): boolean {
        const todayObj = new Date();
        const todayDate = todayObj.getDate();
        const todayDay = todayObj.getDay();
      
        const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));
      
        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

        this.logger.log("firstDayOfWeek")
        this.logger.log(firstDayOfWeek)
        this.logger.log("lastDayOfWeek")
        this.logger.log(lastDayOfWeek)
        this.logger.log("date")
        this.logger.log(date)
     
        return date >= firstDayOfWeek && date <= lastDayOfWeek;
    }
}