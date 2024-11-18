import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameListComponent } from '../games/game-list/game-list.component';
import { TeamListComponent } from '../teams/team-list/team-list.component';

@Component({
    selector: 'avans-nx-workshop-dashboard',
    standalone: true,
    imports: [CommonModule, GameListComponent, TeamListComponent],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {}
