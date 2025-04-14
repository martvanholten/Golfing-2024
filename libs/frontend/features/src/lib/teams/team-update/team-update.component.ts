import { HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, CreateTeam, Team } from '@avans-nx-workshop/frontend/features';
import { TeamService, UserService } from '@avans-nx-workshop/frontend/features';
import { CreateTeamInterface, GameInterface, TeamInterface, UserInterface } from '@avans-nx-workshop/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-team-update',
    templateUrl: './team-update.component.html',
    styleUrls: ['./team-update.component.css']
})
export class TeamUpdateComponent implements OnDestroy{
    team: CreateTeamInterface | TeamInterface = new CreateTeam;
    teamId?: string | null;
    addUserEmail?: string;
    sub$?: Subscription;
    authSub$?: Subscription;
    token$?: Subscription;
    currentUser?: UserInterface;
    httpOptions?: any;
    token?: string;
  
    constructor(
      private route: ActivatedRoute,
      private teamService: TeamService,
      private userService: UserService,
      private authService: AuthService,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        this.teamId = params.get('id');

        if(this.teamId !== null){
          this.sub$ = this.teamService.getOne(this.teamId).subscribe((t) =>{
            if(t != null){
              this.team = t.results as TeamInterface
            }
          })
        }

        this.authSub$ = this.authService.getUserFromLocalStorage().subscribe((u) =>{
          if(u){
            this.currentUser = u;
          }
        });

        this.token$ = this.authService.getTokenFromLocalStorage().subscribe((t) => {
          if(t){
            this.token = t
          }
        });
      });
    }

    onSubmit(): void{
      try {
        if(this.currentUser){
          this.httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + this.token,
              userRole: this.currentUser.role
            })
          }
          if(this.team instanceof CreateTeam){
            this.team.teamCaptain = this.currentUser._id;
            this.team.golfers = new Array<UserInterface>();
            this.team.golfers.push(this.currentUser);
            this.team.rank = 0;
            this.team.games = new Array<GameInterface>();
            this.teamService.createOne(this.team as CreateTeamInterface).subscribe((r) => {
              if(r.message === "error"){
                this.router.navigate(['error']);
              }else if(r.message = "succes"){
                this.router.navigate(['teams']);
              }
            });
          }else{
            if(this.team instanceof Team){
              this.teamService.updateOne(this.currentUser._id, this.team)
            }
          }
        }else{
          // message not loged in
        }
      } catch (error) {
        this.router.navigate(['error']);
      }
    }

  addTeamMember(email?: string): void{
    try {
      if(email){
        if(this.currentUser && this.team instanceof Team){
          this.httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + this.token,
              userRole: this.currentUser.role
            })
          }
          this.sub$ = this.userService.getOneByEmail(email).subscribe(r => {
            if(r.results){
              var user = r.results as UserInterface;
              user.teams.push(this.team as TeamInterface)
              this.userService.updateOne(user, this.httpOptions)
              this.team.golfers.push(user)
              this.teamService.updateOne(this.currentUser!._id, this.team as TeamInterface, this.httpOptions)
            }
          });
        }else{
          this.router.navigate(['error']);
        }
      }else{
        // return message
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
