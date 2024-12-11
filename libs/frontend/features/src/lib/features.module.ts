import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { UserUpdateComponent } from './users/user-update/user-update.component';
import { GameListComponent } from './games/game-list/game-list.component';
import { RouterModule } from '@angular/router';
import { GameColumnsComponent } from './games/game-columns/game-columns.component';
import { TeamListComponent } from './teams/team-list/team-list.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserDetailsSmallComponent } from './users/user-details-small/user-details-small.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserColumnsComponent } from './users/user-columns/user-columns.component';
import { GameDetailsComponent } from './games/game-details/game-details.component';
import { GameDetailsSmallComponent } from './games/game-details-small/game-details-small.component';
import { TeamColumnsComponent } from './teams/team-columns/team-columns.component';
import { TeamUpdateComponent } from './teams/team-update/team-update.component';
import { TeamDetailsSmallComponent } from './teams/team-details-small/team-details-small.component';
import { TeamDetailsComponent } from './teams/team-details/team-details.component';
import { LocationColumnsComponent } from './locations/location-columns/location-columns.component';
import { LocationListComponent } from './locations/location-list/location-list.component';
import { LocationDetailsComponent } from './locations/location-details/location-details.component';
import { LocationDetailsSmallComponent } from './locations/location-details-small/location-details-small.component';
import { UserService } from './users/user.service';
import { GameService } from './games/game.service';
import { LocationService } from './locations/location.service';
import { TeamService } from './teams/team.service';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth.service';

@NgModule({
    declarations: 
    [
        UserUpdateComponent, 
        UserDetailsComponent,
        UserDetailsSmallComponent,
        UserListComponent,
        UserColumnsComponent,
        GameListComponent, 
        GameColumnsComponent,
        GameDetailsComponent,
        GameDetailsSmallComponent,
        TeamListComponent,
        TeamColumnsComponent,
        TeamUpdateComponent,
        TeamDetailsSmallComponent,
        TeamDetailsComponent,
        LocationColumnsComponent,
        LocationListComponent,
        LocationDetailsComponent,
        LocationDetailsSmallComponent,
        LoginComponent,
    ],
    imports: [CommonModule, RouterModule, FormsModule],
    exports: 
    [
        FormsModule,
        UserUpdateComponent, 
        UserDetailsComponent,
        UserDetailsSmallComponent,
        UserListComponent,
        UserColumnsComponent,
        GameListComponent, 
        GameColumnsComponent,
        GameDetailsComponent,
        GameDetailsSmallComponent,
        TeamListComponent,
        TeamColumnsComponent,
        TeamUpdateComponent,
        TeamDetailsSmallComponent,
        TeamDetailsComponent,
        LocationColumnsComponent,
        LocationListComponent,
        LocationDetailsComponent,
        LocationDetailsSmallComponent,
        LoginComponent,
    ],
    providers: 
    [
        provideHttpClient(),
        HttpClient,
        UserService,
        GameService,
        LocationService,
        TeamService,
        AuthService,
    ],
})
export class FeaturesModule {}