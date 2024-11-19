import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '@avans-nx-workshop/frontend/features';
import { LocationService } from '@avans-nx-workshop/frontend/features';
import { Game } from '@avans-nx-workshop/frontend/features';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-game-details',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './game-details.component.html',
    styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnDestroy{
    game?: Game;
    name?: string | null = null;
    location?: string | null = null;
    sub$?: Subscription;
    locations: Location[] = [];


    constructor(
        private route: ActivatedRoute,
        private gameService: GameService,
        private locationService: LocationService
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.name = params.get('name');
            this.location = params.get('location');
            if(this.name != null && this.location != null){
                this.sub$ = this.gameService.getGameOneGame(this.name, this.location)
                .subscribe((g) => {
                    this.game = g;
                });
                // DOES NOT WORK
                // this.sub$.add(
                //     this.locationService.getLocations()
                //     .subscribe((loc) => {
                //         this.locations = loc;
                //     })
                // )
            }
        });
    }

    ngOnDestroy(): void {
        this.sub$?.unsubscribe();
    }
}
