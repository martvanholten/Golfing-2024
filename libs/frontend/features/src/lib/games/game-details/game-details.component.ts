import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, GameService } from '@avans-nx-workshop/frontend/features';
import { GameInterface, UserInterface } from '@avans-nx-workshop/shared/interfaces';
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
    token?: string

    constructor(
        private route: ActivatedRoute,
        private gameService: GameService,
        private router: Router,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.name = params.get('name');
            this.locationName = params.get('location');
            
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
            
            try {
                if(this.name !== null && this.locationName !== null){
                    this.sub$ = this.gameService.getOne(this.name, this.locationName)
                    .subscribe((r) => {
                        this.game = r.results as GameInterface;
                    });
                }
            } catch (error) {
                this.router.navigate(['/error']);
            }
        });
    }

    ngOnDestroy(): void {
        this.sub$?.unsubscribe();
        this.authSub$?.unsubscribe();
        this.token$?.unsubscribe();
    }
}
