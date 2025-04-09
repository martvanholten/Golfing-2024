import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '@avans-nx-workshop/frontend/features';
import { LocationInterface } from '@avans-nx-workshop/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-location-details',
    templateUrl: './location-details.component.html',
    styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnDestroy{
    locationId: string | null = null;
    location?: LocationInterface;
    sub$?: Subscription;
  
    constructor(
      private route: ActivatedRoute,
      private locationService: LocationService,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        this.locationId = params.get('id');
        try {
          this.sub$ = this.locationService.getOne(this.locationId!).subscribe((r) =>{
            if(r.message === "not found"){
              //show alert
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
