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
import { TeamService } from './team.service';
import { ApiResponse, ApiResponseInterface, TeamInterface } from '@avans-nx-workshop/shared/interfaces';
import { defer, Observable, of } from 'rxjs';
import { AccessTokenGuard } from '../auth/guard/access-token.guard';
import { TeamDto, UpdateTeamDto } from '@avans-nx-workshop/backend/dto';
import { UserRoleGuard } from '../auth/guard/user-role.guard';
import { Roles } from '../auth/guard/role-decorator';

@Controller('team')
export class TeamController {
    private readonly logger: Logger = new Logger(TeamController.name);
    constructor(
        private readonly teamService: TeamService,
    ) {}

    @Get()
    findAll(): Observable<ApiResponse<TeamInterface[]>> {
        return defer(() => this.teamService.findAll());
    }

    @Get('top')
    topFiveTeams(): Observable<ApiResponseInterface<TeamInterface[]>> {
        return defer(() => this.teamService.findTopFive());
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<ApiResponseInterface<TeamInterface>> {
        return defer(() => this.teamService.findOne(id));
    }

    @Post('')
    @UseGuards(AccessTokenGuard)
    @UseGuards(UserRoleGuard)
    @Roles('team captain')
    create(@Body() team: TeamDto): Observable<ApiResponseInterface<TeamInterface>> {
        return defer(() => this.teamService.create(team));
    }

    @Put(':userId')
    @UseGuards(AccessTokenGuard)
    @UseGuards(UserRoleGuard)
    @Roles('team captain')
    update(
        @Param('userId') userId: string,
        @Body() team: UpdateTeamDto
    ): Observable<ApiResponseInterface<TeamInterface>> {
        return defer(() => this.teamService.update(userId, team));
    }

    //Might be easier to use teamInterface instead of id
    @Delete(':id/:userId')
    @UseGuards(AccessTokenGuard)
    @UseGuards(UserRoleGuard)
    @Roles('team captain')
    delete(@Param('id') id: string, @Param('userId') userId: string): Observable<ApiResponseInterface<TeamInterface>> {
        return defer(() => this.teamService.delete(id, userId));
    }
}
