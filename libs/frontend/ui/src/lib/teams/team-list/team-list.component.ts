import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '@avans-nx-workshop/frontend/features';
import { Team } from '@avans-nx-workshop/frontend/features';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-team-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './team-list.component.html',
    styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnDestroy{
    teams: Team[] = [];
    sub$?: Subscription;

    constructor(
        private route: ActivatedRoute,
        private teamService: TeamService
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            //DOES NOT WORK
            if(!params.keys.indexOf("home")){
                this.sub$ = this.teamService.getTeams().subscribe((t) => {
                    this.teams = t;
                });
            }else{
                this.sub$ = this.teamService.getTopFiveTeams().subscribe((t) => {
                    this.teams = t;
                });
            }
        });
    }

    ngOnDestroy(): void {
        this.sub$?.unsubscribe();
    }
}