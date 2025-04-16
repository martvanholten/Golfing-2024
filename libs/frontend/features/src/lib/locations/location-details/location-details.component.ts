import { HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, ErrorService, LocationService } from '@avans-nx-workshop/frontend/features';
import { LocationInterface, UserInterface } from '@avans-nx-workshop/shared/interfaces';
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
    httpOptions?: any;
    authSub$?: Subscription;
    token$?: Subscription;
    currentUser?: UserInterface;
    token?: string;
  
    constructor(
      private route: ActivatedRoute,
      private locationService: LocationService,
      private authService: AuthService,
      private router: Router,
      private errorService: ErrorService,
    ) {}
  
    ngOnInit(): void {
      try{
        this.route.paramMap.subscribe((params) => {
          this.authSub$ = this.authService.getUserFromLocalStorage().subscribe((u) =>{
            if(u){
              this.currentUser = u
            }
          });
          this.token$ = this.authService.getTokenFromLocalStorage().subscribe((t) => {
            if(t){
              this.token = t
            }
          });
          this.locationId = params.get('id');
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
        });
      }catch{
        this.router.navigate(['/error']);
      }
    }

    delete(): void{
      if(this.location){
        if(this.currentUser){
          if(this.currentUser._id === this.location.locationManager._id){
            if(this.location.games.length < 1){
              this.httpOptions = {
                headers: new HttpHeaders({
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + this.token,
                  userRole: this.currentUser.role
                })
              }
              this.locationService.deleteOne(this.location._id, this.httpOptions).subscribe(r =>{
                if(r.message === 'succes'){
                  this.router.navigate(['locations']);
                }else if(r.message === 'location not found'){
                  this.errorService.errorMessage = "Locatie niet gevonden"
                  this.router.navigate(['/error']);
                }else if(r.message === 'location has games'){
                  this.errorService.errorMessage = "Locatie niet gevonden"
                  this.router.navigate(['/error']);
                }else{
                  this.router.navigate(['/error']);
                }
              })
            }else{
              console.log(this.errorService.errorMessage)
              this.errorService.errorMessage = "Locatie heeft games"
              this.router.navigate(['/error']);
            }
          }else{
            this.errorService.errorMessage = "Niet de locatie manager"
            this.router.navigate(['/error']);
          }
        }else{
          this.errorService.errorMessage = "Niet ingelogd"
          this.router.navigate(['/error']);
        }
      }else{
        this.errorService.errorMessage = "Geen locatie"
        this.router.navigate(['/error']);
      }
    }

    ngOnDestroy(): void {
        this.sub$?.unsubscribe();
        this.authSub$?.unsubscribe();
        this.token$?.unsubscribe();
    }
}
