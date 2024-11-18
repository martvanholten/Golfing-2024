import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Team } from '@avans-nx-workshop/frontend/features';
import { TeamService } from '@avans-nx-workshop/frontend/features';

@Component({
    selector: 'avans-nx-workshop-team-update',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './team-update.component.html',
    styleUrls: ['./team-update.component.css']
})
export class TeamUpdateComponent {
    teamId: string | null = null;
    team: Team | null = null;
  
    constructor(
      private route: ActivatedRoute,
      private teamService: TeamService
    ) {}
  
    async ngOnInit(): Promise<void> {
      this.route.paramMap.subscribe(async (params) => {
        if(params.get('id')){
            this.teamId = params.get('id');
            this.team = await this.teamService.getTeamById(Number(this.teamId));
        }else{
            this.team = new Team;
        }
      });
    }
}
