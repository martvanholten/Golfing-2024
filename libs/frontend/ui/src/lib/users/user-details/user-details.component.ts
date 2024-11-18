import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../../../../../libs/frontend/features/src/lib/models/user';
import { UserService } from '../../../../../../../libs/frontend/features/src/lib/services/user.service';

@Component({
    selector: 'avans-nx-workshop-user-details',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
    userId: string | null = null;
    user: User | null = null;
  
    constructor(
      private route: ActivatedRoute,
      private userService: UserService
    ) {}
  
    async ngOnInit(): Promise<void> {
      this.route.paramMap.subscribe(async (params) => {
        this.userId = params.get('id');
        this.user = await this.userService.getUserById(Number(this.userId));
      });
    }
}
