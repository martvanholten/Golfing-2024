import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../../../../libs/frontend/features/src/lib/models/user';
import { UserService } from '../../../../../../../libs/frontend/features/src/lib/services/user.service';

@Component({
    selector: 'avans-nx-workshop-user-update',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './user-update.component.html',
    styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent {
  userId: string | null = null;
  user: User | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async (params) => {
      this.userId = params.get('id');
      if (this.userId) {
        this.user = await this.userService.getUserById(Number(this.userId));
      } else {
        this.user = new User();
      }
    });
  }

  save() {
    console.log('Hier komt je save actie');
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
