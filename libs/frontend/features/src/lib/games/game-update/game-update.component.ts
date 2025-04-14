import { HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, CreateGame, CreateTeam, Game, GameService, LocationService, Team, TeamService } from '@avans-nx-workshop/frontend/features';
import { CreateGameInterface, GameInterface, LocationInterface, TeamInterface, UserInterface } from '@avans-nx-workshop/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-team-update',
    templateUrl: './game-update.component.html',
    styleUrls: ['./game-update.component.css']
})
export class GameUpdateComponent implements OnDestroy{
    game: CreateGameInterface | GameInterface = new CreateGame;
    locationName?: string | null;
    gameName?: string | null
    sub$?: Subscription;
    authSub$?: Subscription;
    token$?: Subscription;
    currentUser?: UserInterface;
    httpOptions?: any;
    token?: string;
    team?: TeamInterface;
    locationId?: string;
    addTeamName?: string;
  
    constructor(
      private route: ActivatedRoute,
      private gameService: GameService,
      private locationService: LocationService,
      private authService: AuthService,
      private teamService: TeamService,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        this.gameName = params.get('name');
        this.locationName = params.get('location')

        if(this.gameName && this.locationName){
          this.sub$ = this.locationService.getOneByName(this.locationName).subscribe((l) =>{
            var location = l.results as LocationInterface
            if(location){
              this.locationId = location._id
            }
          })
          if(this.locationId){
            this.sub$ = this.gameService.getOne(this.gameName, this.locationId).subscribe((g) =>{
              if(g){
                this.game = g.results as GameInterface
              }
            })
          }
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
          if(this.game instanceof CreateGame){
            if(this.game.location){
              this.locationService.getOneByName(this.game.location).subscribe(l =>{
                var location = l.results as LocationInterface;
                this.locationId = location._id;
              }); 
              if(this.locationId){
                this.httpOptions = {
                  headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + this.token,
                    userRole: this.currentUser.role,
                  })
                }
                this.game.teams = new Array<TeamInterface>();
                this.game.winner = '';
                this.gameService.createOne(this.locationId, this.game as CreateGameInterface).subscribe((r) => {
                  if(r.message === "error"){
                    this.router.navigate(['error']);
                  }else if(r.message = "succes"){
                    this.router.navigate(['games']);
                  }
                });  
              }else{
                //message no location
              }
            }else{
              //message no location
            }          
          }else{
            if(this.locationId){
              this.gameService.updateOne(this.locationId, this.game as GameInterface)
            }else{
              //message no location
            }
          }
        }else{
          //message not loged in
        }
    } catch (error) {
      this.router.navigate(['error']);
    }
  }

  addGameTeam(name?: string): void{
    try {
      if(name){
        if(this.currentUser && this.game instanceof Game){
          this.teamService.getOneByName(name).subscribe(t=>{
            this.team = t.results as TeamInterface
          });
          if(this.team){
            if(!this.team.largeGames && this.game.holes > 9){
              this.game.teams.push(this.team);
              this.team.games.push(this.game);
              this.teamService.updateOne(this.currentUser._id, this.team);
              if(this.locationId){
                this.gameService.updateOne(this.locationId, this.game)
              }else{
                //message no location
              }
            }else{
              //message team does not play large games
            }
          }else{
            //message team does not exist
          }
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
    this.token$?.unsubscribe();
  }
}
