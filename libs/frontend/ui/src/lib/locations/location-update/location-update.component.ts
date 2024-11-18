import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@avans-nx-workshop/frontend/features';
import { LocationService } from '@avans-nx-workshop/frontend/features';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-location-update',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './location-update.component.html',
    styleUrls: ['./location-update.component.css']
})
export class LocationUpdateComponent implements OnDestroy{
    locationId: string | null = null;
    location?: Location;
    sub$?: Subscription;
  
    constructor(
      private route: ActivatedRoute,
      private locationService: LocationService
    ) {}
  
    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        if(params.get('id')){
            this.locationId = params.get('id');
            this.sub$ = this.locationService.getLocationById(Number(this.locationId))
            .subscribe((loc) => {
              this.location = loc;
            });
        }else{
            this.location = new Location;
        }
      });
    }

    ngOnDestroy(): void {
        this.sub$?.unsubscribe();
    }
}
