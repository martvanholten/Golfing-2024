import {
    Body,
    Controller,
    Get,
    Logger,
    Param,
    Put,
    UseGuards
} from '@nestjs/common';
import { ApiResponse, ApiResponseInterface, GameInterface, LocationInterface } from '@avans-nx-workshop/shared/interfaces';
import { defer, Observable, of } from 'rxjs';
import { LocationService } from './location.service';
import { AccessTokenGuard } from '@avans-nx-workshop/backend/features';

@Controller('location')
export class LocationController {
    private readonly logger: Logger = new Logger(LocationController.name);
    constructor(private readonly locationService: LocationService) {}

    //Location get all
    @Get()
    findAll(): Observable<ApiResponse<LocationInterface[] | LocationInterface>> {
        return defer(() => this.locationService.findAll());
    }

    //Game get all
    @Get('game')
    findAllGames(): Observable<ApiResponse<GameInterface[] | GameInterface>> {
        return defer(() => this.locationService.findAllGames());
    }

    //game get this week
    @Get('game/week')
    findGamesThisWeek(): Observable<ApiResponseInterface<GameInterface[] | GameInterface>> {
        return defer(() => this.locationService.findGamesThisWeek());
    }

    //game get all from location
    @Get(':id/game')
    findAllLocationGames(@Param('id') _id: string): Observable<ApiResponseInterface<GameInterface[] | GameInterface>> {
        return defer(() => this.locationService.findAllLocationGames(_id));
    }

    //game get one
    @Get(':name/game/:gameName')
    findOneGame(@Param('name') name: string, @Param('gameName') gameName: string): Observable<ApiResponseInterface<GameInterface[] | GameInterface>> {
        return defer(() => this.locationService.findOneGame(name, gameName));
    }

    //game add team
    @Put(':name/game/:gameName/addTeam/:userId')
    @UseGuards(AccessTokenGuard)
    updateGame(@Param('name') name: string, @Param('gameName') gameName: string, @Param('userId') userId: string, @Body() teamId: string): Observable<ApiResponseInterface<LocationInterface[] | LocationInterface>> {
        return defer(() => this.locationService.updateGame(name, gameName, teamId, userId));
    }

    //location get one
    @Get(':id')
    findOne(@Param('id') _id: string): Observable<ApiResponseInterface<LocationInterface[] | LocationInterface>> {
        return defer(() => this.locationService.findOne(_id));
    }
}
