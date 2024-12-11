import {
    Controller,
    Get,
    Param,
} from '@nestjs/common';
import { ApiResponse, ApiResponseInterface, LocationInterface } from '@avans-nx-workshop/shared/interfaces';
import { defer, Observable, of } from 'rxjs';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
    constructor(private readonly locationService: LocationService) {}

    @Get()
    findAll(): Observable<ApiResponse<LocationInterface[] | LocationInterface>> {
        return defer(() => this.locationService.findAll());
    }

    // this method should precede the general getOne method, otherwise it never matches
    // @Get('self')
    // getSelf(@InjectToken() token: Token): Observable<ApiResponseInterface<User[] | User>> {
    //     return defer(() => this.userService.findOne(token.id));
    // }
    // async getSelf(@InjectToken() token: Token): Promise<IUser> {
    //     const result = await this.userService.getOne(token.id);
    //     return result;
    // }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<ApiResponseInterface<LocationInterface[] | LocationInterface>> {
        return defer(() => this.locationService.findOne(id));
    }

    // @Get('/game')
    // findAllGames(): Observable<ApiResponseInterface<LocationInterface[] | LocationInterface>> {
    //     return defer(() => this.locationService.findAllGames());
    // }

    // @Get(':id/game/:name')
    // findOneGame(@Param('id') id: string, @Param('name') name: string): Observable<ApiResponseInterface<LocationInterface[] | LocationInterface>> {
    //     return defer(() => this.locationService.findOneGame(id, name));
    // }

    // @Get('/game/week')
    // findGamesThisWeek(): Observable<ApiResponseInterface<LocationInterface[] | LocationInterface>> {
    //     return defer(() => this.locationService.findGamesThisWeek());
    // }
}
