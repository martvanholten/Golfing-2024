import { Module } from '@nestjs/common';
import { TeamDto } from './team/team.dto';
import { LoginData, UpdateUserDto, UserDto } from './user/user.dto';

@Module({
    controllers: [],
    providers: [TeamDto, UserDto, UpdateUserDto, LoginData],
    exports: []
})
export class DtoModule {}
