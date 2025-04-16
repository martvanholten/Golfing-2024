import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorService, LocationService } from '@avans-nx-workshop/frontend/features';
import { LocationInterface } from '@avans-nx-workshop/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-location-details-small',
    templateUrl: './location-details-small.component.html',
    styleUrls: ['./location-details-small.component.css']
})
export class LocationDetailsSmallComponent implements OnDestroy{
    locationId: string | null = null;
    location?: LocationInterface;
    sub$?: Subscription;
  
    constructor(
      private route: ActivatedRoute,
      private locationService: LocationService,
      private router: Router,
      private errorService: ErrorService,
    ) {}
  
    ngOnInit(): void {
      this.route.paramMap.subscribe( (params) => {
        this.locationId = params.get('id');
        try {
          this.sub$ = this.locationService.getOne(this.locationId!).subscribe((r) =>{
            if(r.message === "not found"){
              this.errorService.errorMessage = "Locatie niet gevonden"
              this.router.navigate(['/error']);
            }else if(r.message === "error"){
              this.router.navigate(['/error']);
            }else if(r.message === "succes"){
              this.location = r.results as LocationInterface;
            }
          });
        } catch (error) {
          this.router.navigate(['/error']);
        }
      });
    }

    ngOnDestroy(): void {
      this.sub$?.unsubscribe();
    }
}
