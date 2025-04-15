import {
    Body,
    Controller,
    Get,
    Logger,
    Param,
    Post,
    Put,
    UseGuards
} from '@nestjs/common';
import { ApiResponse, ApiResponseInterface, GameInterface, LocationInterface } from '@avans-nx-workshop/shared/interfaces';
import { defer, Observable, of } from 'rxjs';
import { LocationService } from './location.service';
import { AccessTokenGuard } from '../auth/guard/access-token.guard';
import { GameDto } from '@avans-nx-workshop/backend/dto';
import { UserRoleGuard } from '../auth/guard/user-role.guard';
import { Roles } from '../auth/guard/role-decorator';

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

    //game create
    @Post(':id/game')
    @UseGuards(AccessTokenGuard)
    @UseGuards(UserRoleGuard)
    @Roles('team captain')
    createGame(@Param('id') id: string, @Body() game: GameDto): Observable<ApiResponseInterface<GameInterface[] | GameInterface>> {
        return defer(() => this.locationService.createGame(game, id));
    }

    //game update
    @Put(':id/game/:gameName')
    // @UseGuards(AccessTokenGuard)
    // @UseGuards(UserRoleGuard)
    // @Roles('team captain')
    updateGame(
        @Param('id') locationId: string,
        @Param('gameName') oldGameName: string,
        @Body() game: GameDto
    ): Observable<ApiResponseInterface<GameInterface[] | GameInterface>> {
        return defer(() => this.locationService.updateGame( oldGameName, game, locationId));
    }

    //location get one
    @Get(':id')
    findOne(@Param('id') _id: string): Observable<ApiResponseInterface<LocationInterface[] | LocationInterface>> {
        return defer(() => this.locationService.findOne(_id));
    }
    //location get one
    @Get('name/:name')
    findOneByName(@Param('name') name: string): Observable<ApiResponseInterface<LocationInterface[] | LocationInterface>> {
        return defer(() => this.locationService.findOneByName(name));
    }
}
