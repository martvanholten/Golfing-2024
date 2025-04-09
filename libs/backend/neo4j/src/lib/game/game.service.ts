import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ApiResponse, ApiResponseInterface, GameInterface, LocationInterface, TeamInterface } from '@avans-nx-workshop/shared/interfaces';
import { GameRepo } from './game.repo';

@Injectable()
export class GameService {
    private readonly logger: Logger = new Logger(GameService.name);
    constructor(
        private readonly gameRepo: GameRepo,
    ) {}

}