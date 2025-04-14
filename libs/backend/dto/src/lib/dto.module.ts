import { Module } from '@nestjs/common';
import { TeamDto } from './team/team.dto';
import { LoginData, UpdateUserDto, UserDto } from './user/user.dto';
import { GameDto } from './game/game.dto';

@Module({
    controllers: [],
    providers: [TeamDto, UserDto, UpdateUserDto, LoginData, GameDto],
    exports: []
})
export class DtoModule {}
