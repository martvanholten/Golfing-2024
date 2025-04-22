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
    location?: LocationInterface;
    gameName?: string | null
    sub$?: Subscription;
    authSub$?: Subscription;
    token$?: Subscription;
    currentUser?: UserInterface;
    httpOptions?: any;
    token?: string;
    team?: TeamInterface;
    locationId?: string;
    hasTeam?: boolean;
    inGame?: boolean;
    teamName?: string;
  
    constructor(
      private route: ActivatedRoute,
      private gameService: GameService,
      private locationService: LocationService,
      private authService: AuthService,
      private errorService: ErrorService,
      private teamService: TeamService,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.hasTeam = false
      this.inGame = false
      this.route.paramMap.subscribe((params) => {
        this.gameName = params.get('name');
        this.locationName = params.get('location')

        if(this.gameName && this.locationName){
          this.sub$ = this.locationService.getOneByName(this.locationName).subscribe((l) =>{
            this.location = l.results as LocationInterface
            if(this.location){
              this.locationId = this.location._id
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
            this.token$ = this.authService.getTokenFromLocalStorage().subscribe((t) => {
              if(t){
                this.token = t
                if(this.currentUser){
                  this.httpOptions = {
                    headers: new HttpHeaders({
                      'Content-Type': 'application/json',
                      Authorization: 'Bearer ' + this.token,
                      userRole: this.currentUser.role
                    })
                  }
                }else{
                  this.errorService.errorMessage = "Niet ingelogd"
                  this.router.navigate(['/error']);
                }
              }
            });
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
                if(this.locationId){
                  this.game.gameManager = new Manager(this.currentUser!._id, this.currentUser!.firstName, this.currentUser!.lastName)
                  this.game.teams = new Array<TeamInterface>();
                  if(this.game.winner === 'Geen winnaar'){
                    this.hasTeam = true
                    this.game.winner = ''
                  }
                  this.game.teams.forEach(t =>{
                    if(t.name === this.game.winner){
                      this.hasTeam = true
                    }
                  })
                  if(!this.hasTeam){
                    this.errorService.errorMessage = "Vul een mee spelend team in of vul Geen winnaar in voor geen winnaar"
                    this.router.navigate(['/error']);
                  }else{
                    if(!this.location?.large && this.game.holes! > 9){
                      this.errorService.errorMessage = `Locatie ${this.location?.name} heeft maar negen holes en kan geen wedstrijd hebben met meer dan negen holes`
                      this.router.navigate(['/error']);
                    }else{
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
                    }  
                  }
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
                if(this.game.winner === 'Geen winnaar'){
                  this.hasTeam = true
                  this.game.winner = ''
                }
                this.game.teams.forEach(t =>{
                  if(t.name === this.game.winner){
                    this.hasTeam = true
                  }
                })
                if(!this.hasTeam){
                  this.errorService.errorMessage = "Vul een mee spelend team in of vul Geen winnaar in voor geen winnaar"
                  this.router.navigate(['/error']);
                }else{
                  if(!this.location?.large && this.game.holes! > 9){
                    this.errorService.errorMessage = `Locatie ${this.location?.name} heeft maar negen holes en kan geen wedstrijd hebben met meer dan negen holes`
                    this.router.navigate(['/error']);
                  }else{
                    this.gameService.updateOne(this.locationId, this.gameName!, this.game as GameInterface, this.httpOptions).subscribe(r =>{
                      if(r.message === 'succes'){
                        this.router.navigate(['games']);
                      }else if(r.message === 'game not found'){
                        this.errorService.errorMessage = "Game niet gevonden"
                        this.router.navigate(['/error']);
                      }else if(r.message === 'location not found'){
                        this.errorService.errorMessage = "Locatie niet gevonden"
                        this.router.navigate(['/error']);
                      }else{
                        this.router.navigate(['/error']);
                      }
                    })
                  }
                }
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

  addTeam(name?: string): void{
    try {
      if(this.currentUser && name){
        if(this.locationId && this.gameName){
          this.sub$ = this.gameService.getOne(this.gameName, this.locationId).subscribe(r =>{
            this.game = r.results as GameInterface
            if(this.game){
              this.game.teams.forEach(t =>{
                if(name === t.name){
                  this.inGame = true
                }
              })
              if(this.inGame){
                this.errorService.errorMessage = "Team is al in de wedstrijd"
                this.router.navigate(['/error']);
              }else{
                this.teamService.getOneByName(name).subscribe(r =>{
                  this.team = r.results as TeamInterface
                    if(this.team){
                      if(!this.team.largeGames && this.game.holes! > 9){
                        this.errorService.errorMessage = `team ${name} speelt alleen kleine banen`
                        this.router.navigate(['/error']);
                      }else{
                        this.game.teams.push({
                          name: this.team.name,
                          rank: this.team.rank,
                        })
                        this.gameService.updateOne(this.locationId!, this.game.name!, this.game as GameInterface, this.httpOptions).subscribe()
                        this.team.games.push({
                          name: this.game.name!,
                          location: this.game.location!,
                          date:this.game.date!,
                        })
                        this.teamService.addGame(this.team, this.httpOptions).subscribe()
                      }
                    }else{
                      this.errorService.errorMessage = "Team bestaat niet"
                      this.router.navigate(['/error']);
                    }
                })
              }
            }else{
              this.errorService.errorMessage = "De wedstrijd bestaat niet"
              this.router.navigate(['/error']);
            }
          })
        }else{
          this.errorService.errorMessage = "Geen locatie id of wedstrijd naam in de link"
          this.router.navigate(['/error']);
        }
      }else{
        this.errorService.errorMessage = "Niet ingelogd of geen team naam ingevoerd"
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
