import { HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, ErrorService, GameService, LocationService } from '@avans-nx-workshop/frontend/features';
import { GameInterface, LocationInterface, UserInterface } from '@avans-nx-workshop/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-game-details',
    templateUrl: './game-details.component.html',
    styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnDestroy{
    game?: GameInterface;
    name?: string | null;
    locationName?: string | null;
    sub$?: Subscription;
    authSub$?: Subscription;
    token$?: Subscription;
    currentUser?: UserInterface;
    httpOptions?: any;
    token?: string

    constructor(
        private route: ActivatedRoute,
        private gameService: GameService,
        private router: Router,
        private authService: AuthService,
        private locationService: LocationService,
        private errorService: ErrorService,
    ) {}

    ngOnInit(): void {
        try {
            this.route.paramMap.subscribe((params) => {
                this.name = params.get('name');
                this.locationName = params.get('location');
                
                this.authSub$ = this.authService.getUserFromLocalStorage().subscribe((u) =>{
                    if(u != null){
                        this.currentUser = u;
                    }
                });

                this.token$ = this.authService.getTokenFromLocalStorage().subscribe((t) => {
                    if(t && t){
                        this.token = t
                    }
                });
                
                if(this.name && this.locationName){
                    this.sub$ = this.gameService.getOne(this.name, this.locationName)
                    .subscribe((r) => {
                        if(r.message === 'succes'){
                            this.game = r.results as GameInterface;
                        }else if(r.message === 'game not found'){
                            this.errorService.errorMessage = "Game niet gevonden"
                            this.router.navigate(['/error']);
                        }else{
                            this.router.navigate(['/error']);
                        }
                    });
                }                
            });
        } catch (error) {
            this.router.navigate(['/error']);
        }
    }

    delete(): void{
        if(this.game && this.game.teams.length < 1){
            if(this.locationName){
                if(this.currentUser?._id === this.game.gameManager._id){
                    var location;
                    this.sub$ = this.locationService.getOneByName(this.locationName).subscribe(r =>{
                        location = r.results as LocationInterface
                        if(location){
                            if(this.currentUser){
                                this.httpOptions = {
                                    headers: new HttpHeaders({
                                        'Content-Type': 'application/json',
                                        Authorization: 'Bearer ' + this.token,
                                        userRole: this.currentUser.role
                                    })
                                }
                                this.gameService.deleteOne(location._id, this.game!.name, this.httpOptions).subscribe(r =>{
                                    if(r.message === 'succes'){
                                        this.router.navigate(['games']);
                                    }else if(r.message === 'game not found'){
                                        this.errorService.errorMessage = "Game niet gevonden"
                                        this.router.navigate(['/error']);
                                    }else if(r.message === 'location not found'){
                                        this.errorService.errorMessage = "Locatie niet gevonden"
                                        this.router.navigate(['/error']);
                                    }else if(r.message === 'game has teams'){
                                        this.errorService.errorMessage = "Game heeft teams"
                                        this.router.navigate(['/error']);
                                    }else{
                                        this.router.navigate(['/error']);
                                    }
                                })
                            }else{
                                this.errorService.errorMessage = "Niet ingelogd"
                                this.router.navigate(['/error']);
                            }
                        }else{
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
        }else{
            console.log(this.errorService.errorMessage)
            this.errorService.errorMessage = "Game heeft teams"
            this.router.navigate(['/error']);
        }
    }

    ngOnDestroy(): void {
        this.sub$?.unsubscribe();
        this.authSub$?.unsubscribe();
        this.token$?.unsubscribe();
    }
}
