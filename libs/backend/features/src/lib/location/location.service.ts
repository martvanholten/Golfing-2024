import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ApiResponse, ApiResponseInterface, GameInterface, LocationInterface, TeamInterface, CreateLocationInterface } from '@avans-nx-workshop/shared/interfaces';
import { LocationRepo } from './location.repo';
import { TeamService } from '../team/team.service';
import { GameDto, LocationDto } from '@avans-nx-workshop/backend/dto';

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

    async create(location: LocationDto): Promise<ApiResponseInterface<LocationInterface>> {
        try {
            this.location = await this.locationRepo.findOneByName(location.name)
            console.log(this.location)
            if(this.location){
                this.response = new ApiResponse<LocationInterface>('location already exists')
                return this.response as ApiResponseInterface<LocationInterface>;
            }else{
                this.location = await this.locationRepo.create(location)
                if(this.location){
                    this.response = new ApiResponse<LocationInterface>('succes', this.location)
                    return this.response as ApiResponseInterface<LocationInterface>;
                }else{
                    this.response = new ApiResponse<LocationInterface>('error')
                    return this.response as ApiResponseInterface<LocationInterface>;
                }
            }
        } catch (error) {
            this.response = new ApiResponse<LocationInterface>('error')
            return this.response as ApiResponseInterface<LocationInterface>;
        }
    }
    
    async update(location: LocationInterface): Promise<ApiResponseInterface<LocationInterface>> {
        try {
            this.location = await this.locationRepo.findOne(location._id)
            if(this.location){
                this.location = await this.locationRepo.update(location._id, location)
                if(this.location){
                    this.response = new ApiResponse<LocationInterface>('succes', this.location)
                    return this.response as ApiResponseInterface<LocationInterface>;
                }else{
                    this.response = new ApiResponse<LocationInterface>('error')
                    return this.response as ApiResponseInterface<LocationInterface>;
                }
            }else{
                this.response = new ApiResponse<LocationInterface>('location not found')
                return this.response as ApiResponseInterface<LocationInterface>;
            }
        } catch (error) {
            this.response = new ApiResponse<LocationInterface>('error')
            return this.response as ApiResponseInterface<LocationInterface>;
        }
    }
    
    async delete(_id: string): Promise<ApiResponseInterface<LocationInterface>> {
        try {
            this.location = await this.locationRepo.findOne(_id)
            if(this.location){
                if(this.location.games.length < 1){
                    await this.locationRepo.delete(_id)
                    this.response = new ApiResponse<LocationInterface>('succes')
                    return this.response as ApiResponseInterface<LocationInterface>;
                }else{
                    this.response = new ApiResponse<LocationInterface>('location has games')
                    return this.response as ApiResponseInterface<LocationInterface>;
                }
            }else{
                this.response = new ApiResponse<LocationInterface>('location not found')
                return this.response as ApiResponseInterface<LocationInterface>;
            }
        } catch (error) {
            this.response = new ApiResponse<LocationInterface>('error')
            return this.response as ApiResponseInterface<LocationInterface>;
        }
    }

    async findOneByName(name: string): Promise<ApiResponseInterface<LocationInterface>> {
        try {
            this.location = await this.locationRepo.findOneByName(name);
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
            if(this.game){
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

    async updateGame(oldGameName: string, game: GameDto, locationId: string): Promise<ApiResponseInterface<GameInterface>> {
        try {
            this.location = await this.locationRepo.findOne(locationId)
            if(this.location){
                this.game = await this.locationRepo.findOneGame(this.location.name, oldGameName)
                if(this.game){
                    this. game = await this.locationRepo.updateOneGame(this.location, game, oldGameName)
                    this.response = new ApiResponse<GameInterface>('succes', this.game)
                    return this.response as ApiResponseInterface<GameInterface>;
                }else{
                    this.response = new ApiResponse<GameInterface>('game not found')
                    return this.response as ApiResponseInterface<GameInterface>;    
                }
            }else{
                this.response = new ApiResponse<GameInterface>('location not found')
                return this.response as ApiResponseInterface<GameInterface>;
            }
        } catch (error) {
            this.response = new ApiResponse<GameInterface>('error')
            return this.response as ApiResponseInterface<GameInterface>;
        }
    }

    async deleteGame(gameName: string, locationId: string): Promise<ApiResponseInterface<GameInterface>> {
        try {
            this.location = await this.locationRepo.findOne(locationId)
            if(this.location){
                this.game = await this.locationRepo.findOneGame(this.location.name, gameName)
                if(this.game){
                    if(this.game?.teams.length && this.game.teams.length > 0){
                        this.response = new ApiResponse<GameInterface>('game has teams')
                        return this.response as ApiResponseInterface<GameInterface>;
                    }else{
                        await this.locationRepo.deleteOneGame(this.location, gameName)
                        this.response = new ApiResponse<GameInterface>('succes')
                        return this.response as ApiResponseInterface<GameInterface>;
                    }
                }else{
                    this.response = new ApiResponse<GameInterface>('game not found')
                    return this.response as ApiResponseInterface<GameInterface>;
                }
            }else{
                this.response = new ApiResponse<GameInterface>('location not found')
                return this.response as ApiResponseInterface<GameInterface>;
            }
        } catch (error) {
            this.response = new ApiResponse<GameInterface>('error')
            return this.response as ApiResponseInterface<GameInterface>;
        }
    }

    async createGame(game: GameDto, locationId: string): Promise<ApiResponseInterface<GameInterface>> {
        try {
            this.location = await this.locationRepo.findOne(locationId)
            if(this.location){
                this.game = await this.locationRepo.findOneGame(this.location.name, game.name)
                if(this.game?.name === game.name){
                    this.response = new ApiResponse<GameInterface>('game already exists')
                    return this.response as ApiResponseInterface<GameInterface>;
                }else{
                    this. game = await this.locationRepo.createOneGame(this.location, game)
                    this.response = new ApiResponse<GameInterface>('succes', this.game)
                    return this.response as ApiResponseInterface<GameInterface>;
                }
            }else{
                this.response = new ApiResponse<GameInterface>('location not found')
                return this.response as ApiResponseInterface<GameInterface>;
            }
        } catch (error) {
            this.response = new ApiResponse<GameInterface>('error')
            return this.response as ApiResponseInterface<GameInterface>;
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