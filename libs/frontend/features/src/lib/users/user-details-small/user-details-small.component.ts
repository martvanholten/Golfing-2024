import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@avans-nx-workshop/frontend/features';
import { UserService } from '@avans-nx-workshop/frontend/features';
import { UserInterface } from '@avans-nx-workshop/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-user-details-small',
    templateUrl: './user-details-small.component.html',
    styleUrls: ['./user-details-small.component.css']
})
export class UserDetailsSmallComponent implements OnDestroy{
    userId: string | null = null;
    user?: UserInterface;
    sub$?: Subscription;
  
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService
    ) {}
  
    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        this.userId = params.get('id');
        try {
          this.sub$ = this.userService.getOne(this.userId!).subscribe((r) =>{
            console.log(r);
            if(r.message === "not found"){
              //show alert
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

    ngOnDestroy(): void {
        this.sub$?.unsubscribe();
    }
}
