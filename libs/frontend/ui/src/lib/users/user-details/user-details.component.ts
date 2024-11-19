import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../../../../../libs/frontend/features/src/lib/models/user';
import { UserService } from '../../../../../../../libs/frontend/features/src/lib/services/user.service';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'avans-nx-workshop-user-details',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnDestroy{
    userId: string | null = null;
    user?: User;
    sub$?: Subscription;
  
    constructor(
      private route: ActivatedRoute,
      private userService: UserService
    ) {}
  
    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        this.userId = params.get('id');
        this.sub$ = this.userService.getUserById(Number(this.userId)).subscribe((u) => {
          this.user = u;
        });
      });
    }

    ngOnDestroy(): void {
        this.sub$?.unsubscribe();
    }
}
