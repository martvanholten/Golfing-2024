import { HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, CreateGame, CreateTeam, GameService, Team } from '@avans-nx-workshop/frontend/features';
import { CreateGameInterface, CreateTeamInterface, GameInterface, TeamInterface, UserInterface } from '@avans-nx-workshop/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-team-update',
    templateUrl: './game-update.component.html',
    styleUrls: ['./game-update.component.css']
})
export class GameUpdateComponent implements OnDestroy{
    game: CreateGameInterface | GameInterface = new CreateGame;
    locationId?: string | null;
    gameName?: string | null
    sub$?: Subscription;
    authSub$?: Subscription;
    token$?: Subscription;
    currentUser?: UserInterface;
    httpOptions?: any;
    token?: string;
  
    constructor(
      private route: ActivatedRoute,
      private gameService: GameService,
      private authService: AuthService,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        this.gameName = params.get('name');
        this.locationId = params.get('location')

        if(this.gameName !== null && this.locationId !== null){
          this.sub$ = this.gameService.getOne(this.gameName, this.locationId).subscribe((g) =>{
            if(g != null){
              this.game = g.results as GameInterface
            }
          })
        }else{
          // return message
          this.router.navigate(['games']);
        }

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
        if(this.game instanceof CreateGame){
          if(this.currentUser !== null && this.currentUser !== undefined){
            this.game.teams = new Array<TeamInterface>();
            // this.gameService.createOne(this.game as CreateGameInterface).subscribe((r) => {
            //   if(r.message === "error"){
            //     this.router.navigate(['error']);
            //   }else if(r.message = "succes"){
            //     this.router.navigate(['games']);
            //   }
            // });
          }
        }else{
          if(this.currentUser && this.game instanceof Team){
            // this.gameService.updateOne(this.gameName, this.locationId, this.game)
          }
        }
    } catch (error) {
      this.router.navigate(['error']);
    }
  }

  addGameTeam(id?: string): void{
    try {
      if(id !== null && id !== undefined){
        if(this.currentUser && this.game instanceof Team){
          // this.gameService.updateOne(this.gameName, this.locationId, this.game)
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
