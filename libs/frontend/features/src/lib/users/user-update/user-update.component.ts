import { Component, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateUser, User } from '@avans-nx-workshop/frontend/features';
import { UserService } from '@avans-nx-workshop/frontend/features';
import { ApiResponseInterface, CreateUserInterface, UserInterface } from '@avans-nx-workshop/shared/interfaces';
import { Subscribable, Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-user-update',
    templateUrl: './user-update.component.html',
    styleUrls: ['./user-update.component.css'],
})

export class UserUpdateComponent implements OnDestroy{
  userId: string | null = null;
  user: UserInterface | CreateUserInterface = new CreateUser;
  oldUser?: UserInterface | null;
  sub$?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if(params.get('id') !== null){
        try {
          this.userId = params.get('id');
          this.sub$ = this.userService.getOne(this.userId!).subscribe((r) => {
            if(r.message === "succes"){
              this.oldUser = r.results as User
              this.user = new User(
                this.oldUser._id, this.oldUser.firstName, this.oldUser.lastName, 
                this.oldUser.email, this.oldUser.password, this.oldUser.role, 
                this.oldUser.handicap, this.oldUser.age
              );
            }else if(r.message === "not found"){
              console.log('reached not found')
             //show alert
            }else if(r.message === "error"){
              this.router.navigate(['error']);
            }
          });
        } catch (error) {
          this.router.navigate(['error']);
        }
      }
    });
  }

  onSubmit(): void{
    try {
      if(this.user instanceof CreateUser){
        console.log('reached if no user')
        this.sub$ = this.userService.createOne(this.user).subscribe((r) => {
          if(r.message === "error"){
            this.router.navigate(['error']);
          }
        });
      }else{
        if(this.user instanceof User){
          this.userService.updateOne(this.user).subscribe((r) => {
            console.log()
            if(r.message === "error"){
              this.router.navigate(['error']);
            }
          });
        }
      }
      // this.router.navigate([''], { relativeTo: this.route });
    } catch (error) {
      console.log('reached error')
      this.router.navigate(['error']);
    }
  }

  ngOnDestroy(): void {
    this.sub$?.unsubscribe();
  }
}
