import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from '@avans-nx-workshop/frontend/features';
import { LocationInterface } from '@avans-nx-workshop/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-location-list',
    templateUrl: './location-list.component.html',
    styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnDestroy{
    locations: LocationInterface[] = [];
    sub$?: Subscription;

    constructor(private locationService: LocationService, private router: Router) {}
    ngOnInit(): void {
        try {
            this.sub$ = this.locationService.getAll().subscribe((r) => {
                if(r.message === "error"){
                    this.router.navigate(['/error']);
                }else{
                    this.locations = r.results as LocationInterface[];
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
