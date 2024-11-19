import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../../../../libs/frontend/features/src/lib/models/user';
import { UserService } from '../../../../../../../libs/frontend/features/src/lib/services/user.service';
import { Subscribable, Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-user-update',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './user-update.component.html',
    styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnDestroy{
  userId: string | null = null;
  user?: User;
  sub$?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      if (this.userId) {
        this.sub$ = this.userService.getUserById(Number(this.userId)).subscribe((u) => {
          this.user = u;
        });
      } else {
        this.user = new User();
      }
    });
  }

  ngOnDestroy(): void {
    this.sub$?.unsubscribe();
  }

  save() {
    console.log('Hier komt je save actie');
    this.router.navigate([''], { relativeTo: this.route });
  }
}
