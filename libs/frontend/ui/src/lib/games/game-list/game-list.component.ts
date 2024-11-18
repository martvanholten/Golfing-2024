import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '@avans-nx-workshop/frontend/features';
import { Game } from '@avans-nx-workshop/frontend/features';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'avans-nx-workshop-game-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.css']
})
export class GameListComponent {
    games: Game[] = [];

    constructor(
        private route: ActivatedRoute,
        private gameService: GameService
    ) {}

    async ngOnInit(): Promise<void> {
        this.route.paramMap.subscribe(async (params) => {
            //DOES NOT WORK
            if(!params.has('home')){
                this.games = await this.gameService.getGames();
            }else{
                this.games = await this.gameService.getGamesThisWeek();
            }
        });
    }
}