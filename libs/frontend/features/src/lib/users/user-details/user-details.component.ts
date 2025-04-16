import { HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, ErrorService } from '@avans-nx-workshop/frontend/features';
import { UserService } from '@avans-nx-workshop/frontend/features';
import { UserInterface } from '@avans-nx-workshop/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnDestroy{
    userId: string | null = null;
    currentUser = false;
    user?: UserInterface;
    sub$?: Subscription;
    authSub$?: Subscription;
    token$?: Subscription;
    httpOptions?: any;
    token?: string;
  
    constructor(
      private route: ActivatedRoute,
      private userService: UserService,
      private router: Router,
      private authService: AuthService,
      private errorService: ErrorService,
    ) {}
  
    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        this.userId = params.get('id');
        try {
          this.authSub$ = this.authService.getUserFromLocalStorage().subscribe((u) =>{
            if(u && u._id === params.get('id')){
              this.currentUser = true;
              this.token$ = this.authService.getTokenFromLocalStorage().subscribe((t) => {
                if(t){
                  this.token = t
                }
              });
            }
          });
          this.sub$ = this.userService.getOne(this.userId!).subscribe((r) =>{
            if(r.message === "not found"){
              this.errorService.errorMessage = "Gebruiker niet gevonden"
              this.router.navigate(['/error']);
            }else if(r.message === "error"){
              this.router.navigate(['/error']);
            }else if(r.message === "succes"){
              this.user = r.results as UserInterface;
            }
          });          
        } catch (error) {
          this.router.navigate(['/error']);
        }
      });
    }

    delete(): void{
      if(this.currentUser){
        if(this.user){
          this.httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + this.token,
            })
          }
          if(this.user.teams.length < 1){
            this.userService.deleteOne(this.user, this.httpOptions).subscribe(r =>{
              if(r.message === 'succes'){
                this.authService.logout();
                this.router.navigate(['']);
              }else if(r.message === 'user not found'){
                this.errorService.errorMessage = "Gebruiker niet gevonden"
                this.router.navigate(['/error']);
              }else{
                this.router.navigate(['/error']);
              }
            });
          }else{
            this.router.navigate(['/error']);
          }
        }
      }else{
        this.errorService.errorMessage = "Niet ingelogd"
        this.router.navigate(['/error']);
      }
    }

    ngOnDestroy(): void {
        this.sub$?.unsubscribe();
        this.authSub$?.unsubscribe();
        this.token$?.unsubscribe();
    }
}
