import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '@avans-nx-workshop/frontend/features';
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
