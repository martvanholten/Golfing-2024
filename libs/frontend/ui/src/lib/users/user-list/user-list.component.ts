import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../../../../libs/frontend/features/src/lib/services/user.service';
import { User } from '../../../../../../../libs/frontend/features/src/lib/models/user';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'avans-nx-workshop-user-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
    users: User[] = [];

    constructor(private userService: UserService) {}

    async ngOnInit(): Promise<void> {
        this.users = await this.userService.getUsers();
    }
}
