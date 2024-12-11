import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateTeam, Team } from '@avans-nx-workshop/frontend/features';
import { TeamService } from '@avans-nx-workshop/frontend/features';
import { CreateTeamInterface, TeamInterface } from '@avans-nx-workshop/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-team-update',
    templateUrl: './team-update.component.html',
    styleUrls: ['./team-update.component.css']
})
export class TeamUpdateComponent implements OnDestroy{
    teamId: string | null = null;
    team: TeamInterface | CreateTeamInterface = new CreateTeam;
    sub$?: Subscription;
  
    constructor(
      private route: ActivatedRoute,
      private teamService: TeamService,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        if(params.get('id') !== null){
          try {
            this.teamId = params.get('id');
            this.sub$ = this.teamService.getOne(this.teamId!).subscribe((r) => {
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
        }
      });
    }

    onSubmit(): void{
      try {
        if(this.team instanceof CreateTeam){
          this.sub$ = this.teamService.createOne(this.team).subscribe((r) => {
            if(r.message === "error"){
              this.router.navigate(['error']);
            }
          });
        }else{
          if(this.team instanceof Team){
            this.teamService.updateOne(this.team).subscribe((r) => {
              if(r.message === "error"){
                this.router.navigate(['error']);
              }
            });
          }
        }
        this.router.navigate([''], { relativeTo: this.route });
      } catch (error) {
        this.router.navigate(['error']);
      }
    }
  
    ngOnDestroy(): void {
      this.sub$?.unsubscribe();
    }
}
