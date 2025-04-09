import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '@avans-nx-workshop/frontend/features';
import { GameInterface } from '@avans-nx-workshop/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-game-details-small',
    templateUrl: './game-details-small.component.html',
    styleUrls: ['./game-details-small.component.css']
})
export class GameDetailsSmallComponent implements OnDestroy{
    game?: GameInterface;
    name: string | null = null;
    locationName: string | null = null;
    sub$?: Subscription;

    constructor(
        private route: ActivatedRoute,
        private gameService: GameService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(async (params) => {
            this.name = params.get('name');
            this.locationName = params.get('location');
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
    }
}
