import { Module } from '@nestjs/common';
import { TeamDto } from './team/team.dto';
import { LoginData, UpdateUserDto, UserDto } from './user/user.dto';
import { GameDto } from './game/game.dto';
import { LocationDto } from './location/location.dto';

@Module({
    controllers: [],
    providers: [],
    exports: [TeamDto, UserDto, UpdateUserDto, LoginData, GameDto, LocationDto],
})
export class DtoModule {}
