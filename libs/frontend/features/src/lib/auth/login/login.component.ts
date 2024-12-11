import { Component, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscribable, Subscription } from 'rxjs';
import { LoginData, User } from '@avans-nx-workshop/frontend/features';
import { AuthService } from '@avans-nx-workshop/frontend/features';
import { UserInterface } from '@avans-nx-workshop/shared/interfaces';

@Component({
    selector: 'avans-nx-workshop-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnDestroy{
  user: UserInterface | undefined;
  sub$?: Subscription;
  loginData: LoginData = {
    email: '',
    password: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    
  }

  onSubmit(): void{
    try {
      if(this.loginData?.email !== undefined && this.loginData?.password !== undefined){
        this.sub$ = this.authService.login(this.loginData).subscribe((r) => {
          if(r.message === "succes"){
            this.router.navigate(['']);
          }else if(r.message === "not found"){
           //show alert
          }else if(r.message === "error"){
            this.router.navigate(['error']);
          }
        });
      }
    } catch (error) {
      this.router.navigate(['error']);
    }
  }

  ngOnDestroy(): void {
    this.sub$?.unsubscribe();
  }
}