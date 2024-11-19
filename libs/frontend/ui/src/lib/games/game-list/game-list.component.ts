import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '@avans-nx-workshop/frontend/features';
import { Game } from '@avans-nx-workshop/frontend/features';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-game-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnDestroy{
    games: Game[] = [];
    sub$?: Subscription;

    constructor(
        private route: ActivatedRoute,
        private gameService: GameService
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            //DOES NOT WORK
            if(!params.get('home')){
                this.sub$ = this.gameService.getGames()
                .subscribe((g) => {
                    this.games = g;
                });
            }else{
                console.log('Is home page');
                this.sub$ = this.gameService.getGamesThisWeek()
                .subscribe((g) => {
                    this.games = g;
                });
            }
        });
    }

    ngOnDestroy(): void {
        this.sub$?.unsubscribe();
    }
}