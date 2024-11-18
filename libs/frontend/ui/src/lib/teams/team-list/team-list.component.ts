import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '@avans-nx-workshop/frontend/features';
import { Team } from '@avans-nx-workshop/frontend/features';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'avans-nx-workshop-team-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './team-list.component.html',
    styleUrls: ['./team-list.component.css']
})
export class TeamListComponent {
    teams: Team[] = [];

    constructor(
        private route: ActivatedRoute,
        private teamService: TeamService
    ) {}

    async ngOnInit(): Promise<void> {
        this.route.paramMap.subscribe(async (params) => {
            //DOES NOT WORK
            if(!params.has('home')){
                this.teams = await this.teamService.getTeams();
            }else{
                this.teams = await this.teamService.getTopFiveTeams();
            }
        });
    }
}