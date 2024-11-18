import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationListComponent } from "../location-list/location-list.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'avans-nx-workshop-location-columns',
    standalone: true,
    imports: [CommonModule, RouterModule, LocationListComponent],
    templateUrl: './location-columns.component.html',
    styleUrls: ['./location-columns.component.css']
})
export class LocationColumnsComponent {}
