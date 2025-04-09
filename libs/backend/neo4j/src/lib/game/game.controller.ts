import {
    Body,
    Controller,
    Get,
    Logger,
    Param,
    Put,
    UseGuards
} from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
    private readonly logger: Logger = new Logger(GameController.name);
    constructor(private readonly gameService: GameService) {}

    
}
