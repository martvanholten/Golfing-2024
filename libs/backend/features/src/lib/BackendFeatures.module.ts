import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { LocationController } from './location/location.controller';
import { LocationService } from './location/location.service';
import { TeamController } from './team/team.controller';
import { TeamService } from './team/team.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user/user.schema';
import { Location as LocationModel, LocationSchema } from './location/location.schema';
import { Team as TeamModel, TeamSchema } from './team/team.schema';
import { JwtModule } from '@nestjs/jwt';
import { UserRepo } from './user/user.repo';
import { TeamRepo } from './team/team.repo';
import { LocationRepo } from './location/location.repo';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: LocationModel.name, schema: LocationSchema },
            { name: TeamModel.name, schema: TeamSchema }
        ]),
        JwtModule,
    ],
    controllers: [
        UserController, 
        LocationController,
        TeamController
    ],
    providers: [
        UserService, 
        LocationService, 
        TeamService,
        UserRepo,
        TeamRepo,
        LocationRepo
    ],
    exports: [
        UserService, 
        LocationService, 
        TeamService,
        UserRepo,
        TeamRepo,
        LocationRepo
    ]
})
export class BackendFeaturesModule {}