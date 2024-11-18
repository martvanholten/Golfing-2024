import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '@avans-nx-workshop/frontend/features';
import { Game } from '@avans-nx-workshop/frontend/features';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-game-update',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './game-update.component.html',
    styleUrls: ['./game-update.component.css']
})
export class GameUpdateComponent implements OnDestroy{
    game?: Game;
    name: string | null = null;
    location: string | null = null;
    sub$?: Subscription;

    constructor(
        private route: ActivatedRoute,
        private gameService: GameService
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(async (params) => {
            if(params.get('name') && params.get('location')){
                this.name = params.get('name');
                this.location = params.get('location');
                if(this.name != null && this.location != null){
                    this.sub$ = this.gameService.getGameOneGame(this.name, this.location)
                    .subscribe((g) => {
                        this.game = g;
                    });
                }
            }else{
                this.game = new Game;
            }
        });
    }

    ngOnDestroy(): void {
        this.sub$?.unsubscribe();
    }
}
