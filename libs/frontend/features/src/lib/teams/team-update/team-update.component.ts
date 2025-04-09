import { HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, CreateTeam, Team } from '@avans-nx-workshop/frontend/features';
import { TeamService } from '@avans-nx-workshop/frontend/features';
import { CreateTeamInterface, TeamInterface, UserInterface } from '@avans-nx-workshop/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-team-update',
    templateUrl: './team-update.component.html',
    styleUrls: ['./team-update.component.css']
})
export class TeamUpdateComponent implements OnDestroy{
    team: CreateTeamInterface = new CreateTeam;
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
        this.authSub$ = this.authService.getUserFromLocalStorage().subscribe((u) =>{
          if(u != null){
            this.currentUser = u;
          }
        });

        this.token$ = this.authService.getTokenFromLocalStorage().subscribe((t) => {
          if(t !== null && t !== undefined){
            this.token = t
          }
        });
      });
    }

    onSubmit(): void{
      try {
        this.httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
             Authorization: 'Bearer ' + this.token,
            })
            }
        if(this.currentUser !== null && this.currentUser !== undefined){
          this.team.teamCaptain = this.currentUser._id;
          this.team.golfers = new Array<UserInterface>()
          this.team.golfers.push(this.currentUser)
          this.teamService.createOne(this.team as CreateTeamInterface).subscribe((r) => {
            if(r.message === "error"){
              this.router.navigate(['error']);
            }else if(r.message = "succes"){
              this.router.navigate(['teams']);
            }
          });
        }else{
          this.router.navigate(['user/login']);
        }
    } catch (error) {
      this.router.navigate(['error']);
    }
  }
  
  ngOnDestroy(): void {
    this.sub$?.unsubscribe();
    this.authSub$?.unsubscribe();
  }
}
