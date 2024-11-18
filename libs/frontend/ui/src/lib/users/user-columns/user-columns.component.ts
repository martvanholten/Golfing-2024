import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from "../user-list/user-list.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'avans-nx-workshop-user-columns',
    standalone: true,
    imports: [CommonModule, UserListComponent, RouterModule],
    templateUrl: './user-columns.component.html',
    styleUrls: ['./user-columns.component.css']
})
export class UserColumnsComponent {}
