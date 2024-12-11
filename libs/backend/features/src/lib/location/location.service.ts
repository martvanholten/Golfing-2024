import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ApiResponse, ApiResponseInterface, GameInterface, LocationInterface } from '@avans-nx-workshop/shared/interfaces';
import { LocationRepo } from './location.repo';

@Injectable()
export class LocationService {
    private readonly logger: Logger = new Logger(LocationService.name);
    location?: LocationInterface | null;
    locationList: LocationInterface[] = new Array<LocationInterface>;
    game?: GameInterface | null;
    gameList: GameInterface[] = new Array<GameInterface>;
    response?: ApiResponseInterface<LocationInterface | LocationInterface[]> | null;

    constructor(
        private readonly locationRepo: LocationRepo
    ) {}

    async findAll(): Promise<ApiResponseInterface<LocationInterface[]>> {
        try {
            this.locationList = await this.locationRepo.findAll();
            this.response = new ApiResponse<LocationInterface[]>('succes', this.locationList)
            return this.response as ApiResponseInterface<LocationInterface[]>;
        } catch (error) {
            this.response = new ApiResponse<LocationInterface>('error')
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
                this.response = new ApiResponse<LocationInterface>('not found')
                return this.response as ApiResponseInterface<LocationInterface>;
            }
        } catch (error) {
            this.response = new ApiResponse<LocationInterface>('error')
            return this.response as ApiResponseInterface<LocationInterface>;
        }
    }

    // async findAllGames(): Promise<ApiResponseInterface<GameInterface[]>> {
    //     return locationRepo.findAllGames();
    // }

    // async findOneGame(id: string, name: string): Promise<ApiResponseInterface<GameInterface>> {
    //     return defer(() => this.locationService.findOneGame(id, name));
    // }

    // async findGamesThisWeek(): Promise<ApiResponseInterface<GameInterface[]>> {
    //     return defer(() => this.locationService.findGamesThisWeek());
    // }
}