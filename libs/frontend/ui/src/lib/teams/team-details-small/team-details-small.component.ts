import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Team } from '@avans-nx-workshop/frontend/features';
import { TeamService } from '@avans-nx-workshop/frontend/features';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-team-details-small',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './team-details-small.component.html',
    styleUrls: ['./team-details-small.component.css']
})
export class TeamDetailsSmallComponent implements OnDestroy{
    teamId: string | null = null;
    team?: Team;
    sub$?: Subscription;
  
    constructor(
      private route: ActivatedRoute,
      private teamService: TeamService
    ) {}
  
    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        this.teamId = params.get('id');
        this.sub$ = this.teamService.getTeamById(Number(this.teamId)).subscribe((t) => {
          this.team = t;
        });
      });
    }

    ngOnDestroy(): void {
        this.sub$?.unsubscribe();
    }
}
