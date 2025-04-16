import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post,
    Put,
    UseGuards
} from '@nestjs/common';
import { ApiResponse, ApiResponseInterface, CreateLocationInterface, GameInterface, LocationInterface } from '@avans-nx-workshop/shared/interfaces';
import { defer, Observable, of } from 'rxjs';
import { LocationService } from './location.service';
import { AccessTokenGuard } from '../auth/guard/access-token.guard';
import { GameDto, LocationDto, UpdateLocationDto } from '@avans-nx-workshop/backend/dto';
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

    //location create
    @Post()
    @UseGuards(AccessTokenGuard)
    @UseGuards(UserRoleGuard)
    @Roles('location manager')
    createLocation(@Body() location: LocationDto): Observable<ApiResponseInterface<LocationInterface[] | LocationInterface>> {
        return defer(() => this.locationService.create(location));
    }

    //location update
    @Put(':id')
    @UseGuards(AccessTokenGuard)
    @UseGuards(UserRoleGuard)
    @Roles('location manager')
    updateLocation(
        @Body() location: UpdateLocationDto
    ): Observable<ApiResponseInterface<LocationInterface[] | LocationInterface>> {
        return defer(() => this.locationService.update( location));
    }

    //location delete
    @Delete(':id/delete')
    @UseGuards(AccessTokenGuard)
    @UseGuards(UserRoleGuard)
    @Roles('location manager')
    delete(
        @Param('id') _id: string,
    ): Observable<ApiResponseInterface<LocationInterface[] | LocationInterface>> {
        return defer(() => this.locationService.delete( _id));
    }

    //game create
    @Post(':id/game')
    @UseGuards(AccessTokenGuard)
    @UseGuards(UserRoleGuard)
    @Roles('location manager', 'game manager')
    createGame(@Param('id') id: string, @Body() game: GameDto): Observable<ApiResponseInterface<GameInterface[] | GameInterface>> {
        return defer(() => this.locationService.createGame(game, id));
    }

    //game update
    @Put(':id/game/:gameName')
    @UseGuards(AccessTokenGuard)
    @UseGuards(UserRoleGuard)
    @Roles('location manager', 'game manager')
    updateGame(
        @Param('id') locationId: string,
        @Param('gameName') oldGameName: string,
        @Body() game: GameDto
    ): Observable<ApiResponseInterface<GameInterface[] | GameInterface>> {
        return defer(() => this.locationService.updateGame( oldGameName, game, locationId));
    }

    //game delete
    @Delete(':id/game/:gameName/delete')
    @UseGuards(AccessTokenGuard)
    @UseGuards(UserRoleGuard)
    @Roles('location manager', 'game manager')
    deleteGame(
        @Param('id') locationId: string,
        @Param('gameName') gameName: string,
    ): Observable<ApiResponseInterface<GameInterface[] | GameInterface>> {
        return defer(() => this.locationService.deleteGame( gameName, locationId));
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
