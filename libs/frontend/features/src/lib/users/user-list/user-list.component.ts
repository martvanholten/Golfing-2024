import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@avans-nx-workshop/frontend/features';
import { UserInterface } from '@avans-nx-workshop/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnDestroy{
    users: UserInterface[] = [];
    sub$?: Subscription;

    constructor(private userService: UserService, private router: Router) {}

    ngOnInit(): void {
        try {
            this.sub$ = this.userService.getAll().subscribe((r) => {
                if(r.message === "error"){
                    this.router.navigate(['/error']);
                }else{
                    this.users = r.results as UserInterface[];
                }
            });
        } catch (error) {
            this.router.navigate(['/error']);
        }
    }

    ngOnDestroy(): void {
        this.sub$?.unsubscribe();
    }
}
