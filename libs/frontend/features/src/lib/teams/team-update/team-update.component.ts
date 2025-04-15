import { HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService, UserService, AuthService, CreateTeam, Team } from '@avans-nx-workshop/frontend/features';
import { CreateTeamInterface, GameInterface, TeamInterface, UserInterface } from '@avans-nx-workshop/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-team-update',
    templateUrl: './team-update.component.html',
    styleUrls: ['./team-update.component.css']
})
export class TeamUpdateComponent implements OnDestroy{
  team: CreateTeamInterface | TeamInterface = new CreateTeam;
  user?: UserInterface;
  teamId?: string | null;
  addUserEmail?: string;
  sub$?: Subscription;
  authSub$?: Subscription;
  token$?: Subscription;
  currentUser?: UserInterface;
  httpOptions?: any;
  token?: string;
  addUser?: UserInterface;
  addTeam?: TeamInterface;
  inTeam: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      try {
        this.teamId = params.get('id');
        if(this.teamId !== null){
          this.sub$ = this.teamService.getOne(this.teamId).subscribe((t) =>{
            if(t.results != null){
              this.team = t.results as Team
            }
          })
        }

        this.authSub$ = this.authService.getUserFromLocalStorage().subscribe((u) => {
          if(u){
            this.currentUser = u;
          }
        });

        this.token$ = this.authService.getTokenFromLocalStorage().subscribe((t) => {
          if(t){
            this.token = t
          }
        });

        if(this.currentUser){
          this.httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + this.token,
              userRole: this.currentUser.role
            })
          }
        }else{
          this.router.navigate(['/error']);
        }

      } catch (error) {
        this.router.navigate(['error']);
      }
    });
  }

  onSubmit(): void{
    try {
      if(this.currentUser){
        if(this.team instanceof CreateTeam){
          this.team.teamCaptain = this.currentUser._id;
          this.team.golfers = new Array<UserInterface>();
          this.team.rank = 0;
          this.team.games = new Array<GameInterface>();
          this.teamService.createOne(this.team as CreateTeamInterface, this.httpOptions).subscribe((r) => {
            if(r.message === "error"){
              this.router.navigate(['error']);
            }else if(r.message = "succes"){
              this.team = r.results as TeamInterface            
              this.router.navigate(['']);
            }
          });
        }else{
          this.teamService.updateOne(this.currentUser._id, this.team as TeamInterface, this.httpOptions).subscribe();
          this.router.navigate(['']);
        }
      }else{
        this.router.navigate(['/error']);
      }
    } catch (error) {
      this.router.navigate(['error']);
    }
  }

  addTeamMember(email?: string): void{
    try {
      if(this.currentUser && email){
        this.team.golfers.forEach(g =>{
          if(email === g.email){
            this.inTeam = true
          }
        })
        if(this.inTeam){
          this.router.navigate(['/error']);
        }else{
          this.sub$ = this.userService.getOneByEmail(email).subscribe(r =>{
            this.addUser = r.results as UserInterface
            this.user = this.addUser
            if(this.addUser){
              if(this.team._id){
                this.teamService.getOne(this.team._id).subscribe(r =>{
                  this.addTeam = r.results as TeamInterface
                  if(this.addTeam){
                    this.addTeam.golfers = new Array<UserInterface>
                    this.addUser!.teams = new Array<TeamInterface>
                    this.team.golfers.push(this.addUser!)
                    this.teamService.updateOne(this.addUser!._id, this.team as TeamInterface, this.httpOptions).subscribe()
                    this.user!.teams.push(this.addTeam)
                    this.userService.updateOne(this.addUser!, this.httpOptions).subscribe()
                  }else{
                    this.router.navigate(['/error']);
                  }
                })
              }else{
                this.router.navigate(['/error']);
              }
            }else{
              this.router.navigate(['/error']);
            }
          })
        }
      }else{
        this.router.navigate(['/error']);
      }
    } catch (error) {
      this.router.navigate(['error']);
    }
  }

  ngOnDestroy(): void {
    this.authSub$?.unsubscribe();
    this.token$?.unsubscribe();
    this.sub$?.unsubscribe();
  }
}
