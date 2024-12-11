import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@avans-nx-workshop/frontend/features';
import { UserService } from '@avans-nx-workshop/frontend/features';
import { UserInterface } from '@avans-nx-workshop/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnDestroy{
    private readonly CURRENT_USER = 'currentuser';
    userId: string | null = null;
    user?: UserInterface;
    sub$?: Subscription;
  
    constructor(
      private route: ActivatedRoute,
      private userService: UserService,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        if(params.get('own') !== null){
          if(localStorage.getItem(this.CURRENT_USER)!== null){
            this.userId = JSON.parse(localStorage.getItem(this.CURRENT_USER)!);
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
              this.router.navigate(['error']);
            }
          }else{
            this.router.navigate(['error']);
          }
        }else{
          this.userId = params.get('id');
          try {
            this.sub$ = this.userService.getOne(this.userId!).subscribe((r) =>{
              console.log("not own");
              console.log(r);
              if(r.message === "not found"){
                //show alert
              }else if(r.message === "error"){
                this.router.navigate(['error']);
              }else if(r.message === "succes"){
                this.user = r.results as UserInterface;
              }
            });
          } catch (error) {
            this.router.navigate(['error']);
          }
        }
      });
    }

    ngOnDestroy(): void {
        this.sub$?.unsubscribe();
    }
}
