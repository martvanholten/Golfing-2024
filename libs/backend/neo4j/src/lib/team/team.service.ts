import { HttpException, Injectable, Logger } from '@nestjs/common';
import { TeamRepo } from './team.repo';

@Injectable()
export class TeamService {
    private readonly logger: Logger = new Logger(TeamService.name);

    constructor(
        private readonly teamRepo: TeamRepo
    ) {}

}
