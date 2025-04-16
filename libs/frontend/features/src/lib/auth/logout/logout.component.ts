import { Component, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscribable, Subscription } from 'rxjs';
import { AuthService } from '@avans-nx-workshop/frontend/features';
import { UserInterface } from '@avans-nx-workshop/shared/interfaces';

@Component({
    selector: 'avans-nx-workshop-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css'],
})

export class LogoutComponent implements OnDestroy{
  user: UserInterface | undefined;
  sub$?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    try {
      this.sub$ = this.authService.getUserFromLocalStorage().subscribe((u) => {
        if(u !== null && u !== undefined){
          this.user = u
        }
      });
    } catch (error) {
      this.router.navigate(['/error']);
    }
  }

  ngOnDestroy(): void {}

  logout(): void{
    try {
      this.authService.logout()
      this.router.navigate(['/home']);
    } catch (error) {
      this.router.navigate(['/error']);
    }
  }
}