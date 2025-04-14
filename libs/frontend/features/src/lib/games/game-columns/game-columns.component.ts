import { Component } from '@angular/core';
import { AuthService } from '@avans-nx-workshop/frontend/features';
import { UserInterface } from '@avans-nx-workshop/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-game-columns',
    templateUrl: './game-columns.component.html',
    styleUrls: ['./game-columns.component.css']
})
export class GameColumnsComponent {
    authSub$?: Subscription;
    currentUser?: UserInterface;
    
    constructor(
        private authService: AuthService,
    ) {}
    
    ngOnInit(): void {
        this.authSub$ = this.authService.getUserFromLocalStorage().subscribe((u) =>{
            if(u){
                this.currentUser = u;
            }
        });
    };
    
    ngOnDestroy(): void {
        this.authSub$?.unsubscribe()
    }
}
