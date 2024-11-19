import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Team } from '@avans-nx-workshop/frontend/features';
import { TeamService } from '@avans-nx-workshop/frontend/features';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-team-update',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './team-update.component.html',
    styleUrls: ['./team-update.component.css']
})
export class TeamUpdateComponent implements OnDestroy{
    teamId: string | null = null;
    team?: Team;
    sub$?: Subscription;
  
    constructor(
      private route: ActivatedRoute,
      private teamService: TeamService
    ) {}
  
    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        if(params.get('id')){
            this.teamId = params.get('id');
            this.sub$ = this.teamService.getTeamById(Number(this.teamId)).subscribe((t) => {
              this.team = t;
            });
        }else{
            this.team = new Team;
        }
      });
    }

    ngOnDestroy(): void {
        this.sub$?.unsubscribe();
    }
}
