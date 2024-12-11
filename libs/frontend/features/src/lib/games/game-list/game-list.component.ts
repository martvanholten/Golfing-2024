import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '@avans-nx-workshop/frontend/features';
import { Game } from '@avans-nx-workshop/frontend/features';
import { GameInterface } from '@avans-nx-workshop/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-game-list',
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnDestroy{
    games: GameInterface[] = [];
    sub$?: Subscription;

    constructor(
        private route: ActivatedRoute,
        private gameService: GameService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            //DOES NOT WORK
            if(!params.get('home')){
                try {
                    this.sub$ = this.gameService.getAll().subscribe((r) => {
                        if(r.message === "error"){
                            this.router.navigate(['/error']);
                        }else{
                            this.games = r.results as GameInterface[];
                        }
                    });
                } catch (error) {
                    this.router.navigate(['/error']);
                }
            }else{
                console.log('Is home page');
                try {
                    this.sub$ = this.gameService.getThisWeek().subscribe((r) => {
                        if(r.message === "error"){
                            this.router.navigate(['/error']);
                        }else{
                            this.games = r.results as GameInterface[];
                        }
                    });
                } catch (error) {
                    this.router.navigate(['/error']);
                }
            }
        });
    }

    ngOnDestroy(): void {
        this.sub$?.unsubscribe();
    }
}