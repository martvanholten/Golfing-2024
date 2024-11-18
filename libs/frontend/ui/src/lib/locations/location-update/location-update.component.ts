import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@avans-nx-workshop/frontend/features';
import { LocationService } from '@avans-nx-workshop/frontend/features';

@Component({
    selector: 'avans-nx-workshop-location-update',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './location-update.component.html',
    styleUrls: ['./location-update.component.css']
})
export class LocationUpdateComponent {
    locationId: string | null = null;
    location: Location | null = null;
  
    constructor(
      private route: ActivatedRoute,
      private locationService: LocationService
    ) {}
  
    async ngOnInit(): Promise<void> {
      this.route.paramMap.subscribe(async (params) => {
        if(params.get('id')){
            this.locationId = params.get('id');
            this.location = await this.locationService.getLocationById(Number(this.locationId));
        }else{
            this.location = new Location;
        }
      });
    }
}
