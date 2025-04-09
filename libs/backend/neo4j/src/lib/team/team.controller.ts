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

@Controller('team')
export class TeamController {
    private readonly logger: Logger = new Logger(TeamController.name);
    constructor(private readonly teamService: TeamService) {}

    
}
