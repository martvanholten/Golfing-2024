import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationService } from '@avans-nx-workshop/frontend/features';
import { Location } from '@avans-nx-workshop/frontend/features';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-location-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './location-list.component.html',
    styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnDestroy{
    locations: Location[] = [];
    sub$?: Subscription;

    constructor(private locationService: LocationService) {}
    ngOnInit(): void {
        this.sub$ = this.locationService.getLocations().subscribe((loc) => {
            this.locations = loc;
        });
    }

    ngOnDestroy(): void {
        this.sub$?.unsubscribe();
    }
}
