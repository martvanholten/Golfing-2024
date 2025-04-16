import { HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, AuthService, CreateLocation, LocationService, Manager, ErrorService } from '@avans-nx-workshop/frontend/features';
import { CreateLocationInterface, GameInterface, LocationInterface, UserInterface } from '@avans-nx-workshop/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-team-update',
    templateUrl: './location-update.component.html',
    styleUrls: ['./location-update.component.css']
})
export class LocationUpdateComponent implements OnDestroy{
  location: CreateLocationInterface | LocationInterface = new CreateLocation;
  locationId?: string | null;
  sub$?: Subscription;
  authSub$?: Subscription;
  token$?: Subscription;
  currentUser?: UserInterface;
  httpOptions?: any;
  token?: string;
  
  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService,
    private authService: AuthService,
    private router: Router,
    private errorService: ErrorService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      try {
        this.locationId = params.get('id');
        if(this.locationId !== null){
          this.sub$ = this.locationService.getOne(this.locationId).subscribe((t) =>{
            if(t.results != null){
              this.location = t.results as LocationInterface
            }
          })
        }

        this.authSub$ = this.authService.getUserFromLocalStorage().subscribe((u) => {
          if(u){
            this.currentUser = u;
          }
        });

        this.token$ = this.authService.getTokenFromLocalStorage().subscribe((t) => {
          if(t){
            this.token = t
          }
        });

        if(this.currentUser){
          this.httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + this.token,
              userRole: this.currentUser.role
            })
          }
        }else{
          this.errorService.errorMessage = "Niet ingelogd"
          this.router.navigate(['/error']);
        }

      } catch (error) {
        this.router.navigate(['/error']);
      }
    });
  }

  onSubmit(): void{
    try {
      if(this.currentUser){
        if(this.location instanceof CreateLocation){
          this.location.games = new Array<GameInterface>
          this.location.locationManager = new Manager(this.currentUser._id, this.currentUser.firstName, this.currentUser.lastName);
          this.locationService.createOne(this.location as CreateLocationInterface, this.httpOptions).subscribe((r) => {
            if(r.message === "error"){
              this.router.navigate(['/error']);
            }else if(r.message === "succes"){
              this.location = r.results as LocationInterface         
              this.router.navigate(['locations']);
            }else if(r.message === 'location already exists'){
              this.errorService.errorMessage = "Locatie bestaat al"
              this.router.navigate(['/error']);
            }
          });
        }else{
          if(this.currentUser._id === this.location.locationManager?._id){
            this.locationService.updateOne(this.location as LocationInterface, this.httpOptions).subscribe(r =>{
              if(r.message === 'succes'){
                this.router.navigate(['locations']);
              }else if(r.message === 'location not found'){
                this.errorService.errorMessage = "Locatie niet gevonden"
                this.router.navigate(['/error']);
              }else{
                this.router.navigate(['/error']);
              }
            });
          }else{
            this.errorService.errorMessage = "Niet de locatie manager"
            this.router.navigate(['/error']);
          }
        }
      }else{
        this.errorService.errorMessage = "Niet ingelogd"
        this.router.navigate(['/error']);
      }
    } catch (error) {
      this.router.navigate(['error']);
    }
  }

  ngOnDestroy(): void {
    this.authSub$?.unsubscribe();
    this.token$?.unsubscribe();
    this.sub$?.unsubscribe();
  }
}
