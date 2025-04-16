import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorService, GameService } from '@avans-nx-workshop/frontend/features';
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
        private router: Router,
        private errorService: ErrorService,
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(async (params) => {
            this.name = params.get('name');
            this.locationName = params.get('location');
            try {
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
            } catch (error) {
                this.router.navigate(['/error']);
            }
        });
    }

    ngOnDestroy(): void {
        this.sub$?.unsubscribe();
    }
}
