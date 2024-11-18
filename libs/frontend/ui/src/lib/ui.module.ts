import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GameColumnsComponent } from './games/game-columns/game-columns.component';
import { GameDetailsComponent } from './games/game-details/game-details.component';
import { GameDetailsSmallComponent } from './games/game-details-small/game-details-small.component';
import { GameListComponent } from './games/game-list/game-list.component';
import { GameUpdateComponent } from './games/game-update/game-update.component';
import { LocationColumnsComponent } from './locations/location-columns/location-columns.component';
import { LocationDetailsComponent } from './locations/location-details/location-details.component';
import { LocationDetailsSmallComponent } from './locations/location-details-small/location-details-small.component';
import { LocationListComponent } from './locations/location-list/location-list.component';
import { LocationUpdateComponent } from './locations/location-update/location-update.component';
import { UserColumnsComponent } from './users/user-columns/user-columns.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserDetailsSmallComponent } from './users/user-details-small/user-details-small.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserUpdateComponent } from './users/user-update/user-update.component';
import { TeamColumnsComponent } from './teams/team-columns/team-columns.component';
import { TeamDetailsComponent } from './teams/team-details/team-details.component';
import { TeamDetailsSmallComponent } from './teams/team-details-small/team-details-small.component';
import { TeamListComponent } from './teams/team-list/team-list.component';
import { TeamUpdateComponent } from './teams/team-update/team-update.component';
import { FooterComponent } from './ui/footer/footer.component';
import { HeaderComponent } from './ui/header/header.component';
import { ErrorComponent } from './ui/error/error.component';

@NgModule({
    imports: [
        CommonModule,
        AboutComponent,
        DashboardComponent,
        GameColumnsComponent,
        GameDetailsComponent,
        GameDetailsSmallComponent,
        GameListComponent,
        GameUpdateComponent,
        LocationColumnsComponent,
        LocationDetailsComponent,
        LocationDetailsSmallComponent,
        LocationListComponent,
        LocationUpdateComponent,
        UserColumnsComponent,
        UserDetailsComponent,
        UserDetailsSmallComponent,
        UserListComponent,
        UserUpdateComponent,
        TeamColumnsComponent,
        TeamDetailsComponent,
        TeamDetailsSmallComponent,
        TeamListComponent,
        TeamUpdateComponent,
        FooterComponent,
        HeaderComponent,
        ErrorComponent,
    ],

    exports: [
        CommonModule,
        AboutComponent,
        DashboardComponent,
        GameColumnsComponent,
        GameDetailsComponent,
        GameDetailsSmallComponent,
        GameListComponent,
        GameUpdateComponent,
        LocationColumnsComponent,
        LocationDetailsComponent,
        LocationDetailsSmallComponent,
        LocationListComponent,
        LocationUpdateComponent,
        UserColumnsComponent,
        UserDetailsComponent,
        UserDetailsSmallComponent,
        UserListComponent,
        UserUpdateComponent,
        TeamColumnsComponent,
        TeamDetailsComponent,
        TeamDetailsSmallComponent,
        TeamListComponent,
        TeamUpdateComponent,
        FooterComponent,
        HeaderComponent,
        ErrorComponent,
    ],
})
export class UiModule {}
