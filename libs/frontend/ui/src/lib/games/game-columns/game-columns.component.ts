import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameListComponent } from "../game-list/game-list.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'avans-nx-workshop-game-columns',
    standalone: true,
    imports: [CommonModule, RouterModule, GameListComponent],
    templateUrl: './game-columns.component.html',
    styleUrls: ['./game-columns.component.css']
})
export class GameColumnsComponent {}
