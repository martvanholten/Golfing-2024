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
import { TeamService } from './team.service';
import { ApiResponse, ApiResponseInterface, CreateTeamInterface, TeamInterface } from '@avans-nx-workshop/shared/interfaces';
import { defer, Observable, of } from 'rxjs';

@Controller('team')
export class TeamController {
    private readonly logger: Logger = new Logger(TeamController.name);
    constructor(private readonly teamService: TeamService) {}

    @Get()
    findAll(): Observable<ApiResponse<TeamInterface[]>> {
        return defer(() => this.teamService.findAll());
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
    findOne(@Param('id') id: string): Observable<ApiResponseInterface<TeamInterface>> {
        return defer(() => this.teamService.findOne(id));
    }

    @Post('')
    // @UseGuards(UserExistGuard)
    create(@Body() team: CreateTeamInterface): Observable<ApiResponseInterface<TeamInterface>> {
        return defer(() => this.teamService.create(team));
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() team: CreateTeamInterface
    ): Observable<ApiResponseInterface<TeamInterface>> {
        return defer(() => this.teamService.update(id, team));
    }

    @Get('top')
    topFiveTeams(): Observable<ApiResponseInterface<TeamInterface[]>> {
        this.logger.log('reached controller top five')
        return defer(() => this.teamService.findTopFive());
    }
}
