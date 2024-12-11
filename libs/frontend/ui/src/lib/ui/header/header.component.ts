import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserInterface } from '@avans-nx-workshop/shared/interfaces';

@Component({
    selector: 'avans-nx-workshop-header',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    private readonly CURRENT_USER = 'currentuser';
    currentUser?: UserInterface | undefined;

    ngOnInit(): void {
        if(localStorage.getItem(this.CURRENT_USER)!== null){
            this.currentUser === JSON.parse(localStorage.getItem(this.CURRENT_USER)!);
        }
    }
}
