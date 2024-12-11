import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '@avans-nx-workshop/frontend/features';
import { LocationService } from '@avans-nx-workshop/frontend/features';
import { GameInterface, LocationInterface } from '@avans-nx-workshop/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-game-details',
    templateUrl: './game-details.component.html',
    styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnDestroy{
    game?: GameInterface;
    name?: string | null;
    locationId?: string | null;
    sub$?: Subscription;
    location?: LocationInterface;


    constructor(
        private route: ActivatedRoute,
        private gameService: GameService,
        private locationService: LocationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.name = params.get('name');
            this.locationId = params.get('location');
            try {
                if(this.name !== null && this.locationId !== null){
                    this.sub$ = this.gameService.getOne(this.name, this.locationId)
                    .subscribe((r) => {
                        this.game = r.results as GameInterface;
                    });
                    this.sub$ = this.locationService.getOne(this.locationId)
                    .subscribe((r) => {
                        this.location = r.results as LocationInterface;
                    });
                }
            } catch (error) {
                this.router.navigate(['/error']);
            }
        });
    }

    ngOnDestroy(): void {
        this.sub$?.unsubscribe();
    }
}
