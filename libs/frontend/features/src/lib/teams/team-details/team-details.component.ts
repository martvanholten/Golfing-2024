import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '@avans-nx-workshop/frontend/features';
import { TeamService } from '@avans-nx-workshop/frontend/features';
import { TeamInterface } from '@avans-nx-workshop/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-team-details',
    templateUrl: './team-details.component.html',
    styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnDestroy{
    teamId: string | null = null;
    team?: TeamInterface;
    sub$?: Subscription;
  
    constructor(
      private route: ActivatedRoute,
      private teamService: TeamService,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        try {
          this.teamId = params.get('id');
          this.sub$ = this.teamService.getOne(this.teamId!).subscribe((r) => {
            console.log(r)
            if(r.message === 'succes'){
              this.team = r.results! as TeamInterface;
            }else if(r.message === 'not found'){
              //show alert
            }else if(r.message === 'succes'){
              this.router.navigate(['error']);
            }
          });  
        } catch (error) {
          this.router.navigate(['error']);
        }
      });
    }

    ngOnDestroy(): void {
        this.sub$?.unsubscribe();
    }
}
