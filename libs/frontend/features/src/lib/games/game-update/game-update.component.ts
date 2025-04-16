import { HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, CreateGame, CreateTeam, ErrorService, Game, GameService, LocationService, Manager, Team, TeamService } from '@avans-nx-workshop/frontend/features';
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
  
    constructor(
      private route: ActivatedRoute,
      private gameService: GameService,
      private locationService: LocationService,
      private authService: AuthService,
      private errorService: ErrorService,
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
            if(this.locationId){
              this.sub$ = this.gameService.getOne(this.gameName!, this.locationId).subscribe((g) =>{
                if(g){
                  this.game = g.results as GameInterface
                }
              })
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
          if(this.game instanceof CreateGame){
            if(this.game.location){
              this.locationService.getOneByName(this.game.location).subscribe(l =>{
                var location = l.results as LocationInterface;
                this.locationId = location._id;
                if(this.locationId){
                  this.game.gameManager = new Manager(this.currentUser!._id, this.currentUser!.firstName, this.currentUser!.lastName)
                  this.game.teams = new Array<TeamInterface>();
                  this.game.winner = '';
                  this.gameService.createOne(this.locationId, this.game as CreateGameInterface, this.httpOptions).subscribe((r) => {
                    if(r.message === "error"){
                      this.router.navigate(['error']);
                    }else if(r.message === "succes"){
                      this.router.navigate(['games']);
                    }else if(r.message === 'game already exists'){
                      this.errorService.errorMessage = "Game bestaat al"
                      this.router.navigate(['/error']);
                    }else if(r.message === 'location not found'){
                      this.errorService.errorMessage = "Locatie niet gevonden"
                      this.router.navigate(['/error']);
                    }
                  });  
                }else{
                  this.router.navigate(['/error']);
                }
              });
            }else{
              this.router.navigate(['/error']);
            }          
          }else{
            if(this.locationId){
              if(this.currentUser._id === this.game.gameManager?._id){
                this.gameService.updateOne(this.locationId, this.gameName!, this.game as GameInterface, this.httpOptions).subscribe(r =>{
                  if(r.message === 'succes'){
                    this.router.navigate(['games']);
                  }else if(r.message === 'game not found'){
                    this.errorService.errorMessage = "Game niet gevonden"
                    this.router.navigate(['/error']);
                  }else if(r.message === 'location not found'){
                    this.errorService.errorMessage = "Locatie niet gevonden"
                    this.router.navigate(['/error']);
                  }
                })
              }else{
                this.errorService.errorMessage = "Niet de game manager"
                this.router.navigate(['/error']);
              }
            }else{
              this.router.navigate(['/error']);
            }
          }
        }else{
          this.errorService.errorMessage = "Niet ingelogd"
          this.router.navigate(['/error']);
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
