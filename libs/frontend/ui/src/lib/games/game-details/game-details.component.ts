import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '@avans-nx-workshop/frontend/features';
import { Game } from '@avans-nx-workshop/frontend/features';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'avans-nx-workshop-game-details',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './game-details.component.html',
    styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent {
    game: Game | null = null;
    name: string | null = null;
    location: string | null = null;

    constructor(
        private route: ActivatedRoute,
        private gameService: GameService
    ) {}

    async ngOnInit(): Promise<void> {
        this.route.paramMap.subscribe(async (params) => {
            this.name = params.get('name');
            this.location = params.get('location');
            console.log(this.name);
            console.log(this.location);
            if(this.name != null && this.location != null){
                this.gameService.getGameOneGame(this.name, this.location);
            }
        });
    }
}
