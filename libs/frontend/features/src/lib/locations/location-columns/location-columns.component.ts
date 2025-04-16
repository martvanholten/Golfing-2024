import { Component } from '@angular/core';
import { AuthService } from '@avans-nx-workshop/frontend/features';
import { UserInterface } from '@avans-nx-workshop/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-location-columns',
    templateUrl: './location-columns.component.html',
    styleUrls: ['./location-columns.component.css']
})
export class LocationColumnsComponent {
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
