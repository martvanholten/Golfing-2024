import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@avans-nx-workshop/frontend/features';
import { LocationService } from '@avans-nx-workshop/frontend/features';

@Component({
    selector: 'avans-nx-workshop-location-details-small',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './location-details-small.component.html',
    styleUrls: ['./location-details-small.component.css']
})
export class LocationDetailsSmallComponent {
    locationId: string | null = null;
    location: Location | null = null;
  
    constructor(
      private route: ActivatedRoute,
      private locationService: LocationService
    ) {}
  
    async ngOnInit(): Promise<void> {
      this.route.paramMap.subscribe( (params) => {
        this.locationId = params.get('id');
        this.location = this.locationService.getLocationById(Number(this.locationId));
      });
    }
}
