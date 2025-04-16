import { HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, CreateUser, ErrorService, User } from '@avans-nx-workshop/frontend/features';
import { UserService } from '@avans-nx-workshop/frontend/features';
import { CreateUserInterface, UserInterface } from '@avans-nx-workshop/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-user-update',
    templateUrl: './user-update.component.html',
    styleUrls: ['./user-update.component.css'],
})

export class UserUpdateComponent implements OnDestroy{
  user: UserInterface | CreateUserInterface = new CreateUser;
  currentUser?: UserInterface;
  user$?: Subscription;
  sub$?: Subscription;
  token$?: Subscription;
  token?: string;
  httpOptions?: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private errorService: ErrorService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      try {
        this.user$ = this.authService.getUserFromLocalStorage().subscribe((u) => {
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
          this.sub$ = this.userService.getOne(this.currentUser._id).subscribe(r =>{
            if(r.message === 'succes'){
              this.user = r.results as User
              this.user.password = this.currentUser!.password
            }
          })
        }
      } catch (error) {
        this.router.navigate(['error']);
      }
    });
  }

  onSubmit(): void{
    try {
      if(this.user instanceof CreateUser){
        this.user$ = this.userService.createOne(this.user).subscribe((r) => {
          if(r.message === 'error'){
            this.router.navigate(['error']);
          }else if(r.message === 'user already exists'){
            this.errorService.errorMessage = "Gebruiker bestaat al"
            this.router.navigate(['/error']);
          }else{
            this.router.navigate(['users/login']);
          }
        });
      }else{
        if(this.user instanceof User){
          this.httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + this.token,
              userRole: this.user.role
            })
          }
          this.userService.updateOne(this.user, this.httpOptions).subscribe((r) => {
            if(r.message === "error"){
              this.router.navigate(['error']);
            }else if(r.message === 'user not found'){
              this.errorService.errorMessage = "Gebruiker niet gevonden"
              this.router.navigate(['/error']);
            }else if(r.message === "succes"){
              if(this.token){
                this.authService.saveUserToLocalStorage(this.user as UserInterface, this.token)
              }
            }
          });
        }
      }
      this.router.navigate([''], { relativeTo: this.route });
    } catch (error) {
      this.router.navigate(['error']);
    }
  }

  ngOnDestroy(): void {
    this.user$?.unsubscribe();
    this.token$?.unsubscribe();
    this.sub$?.unsubscribe()
  }
}
