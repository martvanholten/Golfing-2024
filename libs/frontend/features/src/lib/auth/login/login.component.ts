import { Component, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscribable, Subscription } from 'rxjs';
import { ErrorService, LoginData, User } from '@avans-nx-workshop/frontend/features';
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
    private router: Router,
    private authService: AuthService,
    private errorService: ErrorService,
  ) {}

  ngOnInit(): void {
    
  }

  onSubmit(): void{
    try {
      if(this.loginData?.email && this.loginData?.password){
        this.sub$ = this.authService.login(this.loginData).subscribe((r) => {
          console.log(this.loginData.email)
          console.log(this.loginData.password)
          console.log('REACHED')
          console.log(r.message)
          if(r.message === "succes"){
            this.router.navigate(['']);
          }else if(r.message === 'user not found'){
            this.errorService.errorMessage = 'Fout email of wachtwoord'
            this.router.navigate(['/error']);
          }else if(r.message === "error"){
            this.router.navigate(['/error']);
          }else if(r.message === 'wrong password'){
            this.errorService.errorMessage = 'Fout email of wachtwoord'
            this.router.navigate(['/error']);
          }
        });
      }
    } catch (error) {
      this.router.navigate(['/error']);
    }
  }

  ngOnDestroy(): void {
    this.sub$?.unsubscribe();
  }
}