import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Location } from '@avans-nx-workshop/frontend/features';
import { LocationService } from '@avans-nx-workshop/frontend/features';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-location-details',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './location-details.component.html',
    styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnDestroy{
    locationId: string | null = null;
    location?: Location;
    sub$?: Subscription;
  
    constructor(
      private route: ActivatedRoute,
      private locationService: LocationService
    ) {}
  
    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        this.locationId = params.get('id');
        this.sub$ = this.locationService.getLocationById(Number(this.locationId))
        .subscribe((loc) => {
          this.location = loc;
        });
      });
    }

    ngOnDestroy(): void {
        this.sub$?.unsubscribe();
    }
}
