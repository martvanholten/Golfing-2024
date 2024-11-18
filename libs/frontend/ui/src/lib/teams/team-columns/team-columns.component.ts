import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamListComponent } from "../team-list/team-list.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'avans-nx-workshop-team-columns',
    standalone: true,
    imports: [CommonModule, TeamListComponent, RouterModule],
    templateUrl: './team-columns.component.html',
    styleUrls: ['./team-columns.component.css']
})
export class TeamColumnsComponent {}
