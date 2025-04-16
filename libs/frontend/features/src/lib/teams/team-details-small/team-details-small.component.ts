import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorService, TeamService } from '@avans-nx-workshop/frontend/features';
import { TeamInterface } from '@avans-nx-workshop/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-team-details-small',
    templateUrl: './team-details-small.component.html',
    styleUrls: ['./team-details-small.component.css']
})
export class TeamDetailsSmallComponent implements OnDestroy{
    teamId: string | null = null;
    team?: TeamInterface;
    sub$?: Subscription;
  
    constructor(
      private route: ActivatedRoute,
      private teamService: TeamService,
      private router: Router,
      private errorService: ErrorService,
    ) {}
  
    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        try {
          this.teamId = params.get('id');
          this.sub$ = this.teamService.getOne(this.teamId!).subscribe((r) => {
            if(r.message === 'succes'){
              this.team = r.results! as TeamInterface;
            }else if(r.message === 'not found'){
              this.errorService.errorMessage = "Team niet gevonden"
              this.router.navigate(['/error']);
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
