import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Location } from '@avans-nx-workshop/frontend/features';
import { LocationService } from '@avans-nx-workshop/frontend/features';

@Component({
    selector: 'avans-nx-workshop-location-details',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './location-details.component.html',
    styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent {
    locationId: string | null = null;
    location: Location | null = null;
  
    constructor(
      private route: ActivatedRoute,
      private locationService: LocationService
    ) {}
  
    async ngOnInit(): Promise<void> {
      this.route.paramMap.subscribe(async (params) => {
        this.locationId = params.get('id');
        this.location = await this.locationService.getLocationById(Number(this.locationId));
      });
    }
}
