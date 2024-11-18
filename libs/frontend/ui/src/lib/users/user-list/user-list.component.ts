import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../../../../libs/frontend/features/src/lib/services/user.service';
import { User } from '../../../../../../../libs/frontend/features/src/lib/models/user';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-user-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnDestroy{
    users: User[] = [];
    sub$?: Subscription;

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.sub$ = this.userService.getUsers().subscribe((u) => {
            this.users = u;
        });
    }

    ngOnDestroy(): void {
        this.sub$?.unsubscribe();
    }
}
