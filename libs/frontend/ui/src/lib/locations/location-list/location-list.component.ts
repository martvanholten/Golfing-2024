import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationService } from '@avans-nx-workshop/frontend/features';
import { Location } from '@avans-nx-workshop/frontend/features';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'avans-nx-workshop-location-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './location-list.component.html',
    styleUrls: ['./location-list.component.css']
})
export class LocationListComponent {
    locations: Location[] = [];

    constructor(private locationService: LocationService) {}

    async ngOnInit(): Promise<void> {
        this.locations = await this.locationService.getLocations();
    }
}
