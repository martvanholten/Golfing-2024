import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@avans-nx-workshop/frontend/features';
import { TeamService } from '@avans-nx-workshop/frontend/features';
import { TeamInterface } from '@avans-nx-workshop/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-team-details',
    templateUrl: './team-details.component.html',
    styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnDestroy{
    isCaptain = false;
    teamId: string | null = null;
    team?: TeamInterface;
    sub$?: Subscription;
    authSub$?: Subscription;
  
    constructor(
      private route: ActivatedRoute,
      private teamService: TeamService,
      private authService: AuthService,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        try {
          this.teamId = params.get('id');
          this.sub$ = this.teamService.getOne(this.teamId!).subscribe((r) => {
            if(r.message === 'succes'){
              this.team = r.results! as TeamInterface;
              this.authSub$ = this.authService.getUserFromLocalStorage().subscribe((u) =>{
                if(u != null){
                  if(u._id == this.team?.teamCaptain){
                    this.isCaptain = true;
                  }
                }
              });
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

    onClickDelete(): void{

    }

    ngOnDestroy(): void {
        this.sub$?.unsubscribe();
        this.authSub$?.unsubscribe()
    }
}
