import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '@avans-nx-workshop/frontend/features';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-team-columns',
    templateUrl: './team-columns.component.html',
    styleUrls: ['./team-columns.component.css']
})
export class TeamColumnsComponent implements OnDestroy{
    authSub$?: Subscription;
    currentUser = false;

    constructor(
          private authService: AuthService,
        ) {}

    ngOnInit(): void {
        this.authSub$ = this.authService.getUserFromLocalStorage().subscribe((u) =>{
            if(u != null){
                this.currentUser = true;
            }
          });
    };

    ngOnDestroy(): void {
        this.authSub$?.unsubscribe()
    }
}
