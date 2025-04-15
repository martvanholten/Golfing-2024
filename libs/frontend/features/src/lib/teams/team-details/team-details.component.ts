import { HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@avans-nx-workshop/frontend/features';
import { TeamService } from '@avans-nx-workshop/frontend/features';
import { TeamInterface, UserInterface } from '@avans-nx-workshop/shared/interfaces';
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
    token$?: Subscription;
    currentUser?: UserInterface;
    httpOptions?: any;
    token?: string;
  
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
                if(u){
                  this.currentUser = u
                  if(u._id === this.team?.teamCaptain){
                    this.isCaptain = true;
                  }
                }
              });
              this.token$ = this.authService.getTokenFromLocalStorage().subscribe((t) => {
                if(t){
                  this.token = t
                }
              });
            }else if(r.message === 'not found'){
              this.router.navigate(['/error']);
            }else if(r.message === 'error'){
              this.router.navigate(['error']);
            }
          });  
        } catch (error) {
          this.router.navigate(['error']);
        }
      });
    }

    delete(): void{
      console.log('REACHED DELETE')
      if(this.isCaptain && this.team){
        console.log('REACHED DELETE2')
        if(this.team.games.length < 1){
          console.log('REACHED DELETE3')
          if(this.currentUser){
            this.httpOptions = {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.token,
                userRole: this.currentUser.role
              })
            }
            console.log('REACHED DELETE4')
            this.teamService.deleteOne(this.team._id, this.currentUser._id, this.httpOptions).subscribe()
            this.router.navigate(['']);
          }else{
            this.router.navigate(['/error']);
          }
        }else{
          this.router.navigate(['/error']);
        }
      }else{
        this.router.navigate(['/error']);
      }
    }

    ngOnDestroy(): void {
        this.sub$?.unsubscribe();
        this.authSub$?.unsubscribe()
        this.token$?.unsubscribe();
    }
}
