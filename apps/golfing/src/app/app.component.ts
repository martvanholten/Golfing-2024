import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { AboutComponent } from '@avans-nx-workshop/frontend/ui';
import { DashboardComponent } from '@avans-nx-workshop/frontend/ui';
import { FooterComponent } from '@avans-nx-workshop/frontend/ui';
import { HeaderComponent } from '@avans-nx-workshop/frontend/ui';

@Component({
    standalone: true,
    imports: [
        NxWelcomeComponent,
        RouterModule,
        AboutComponent,
        DashboardComponent,
        FooterComponent,
        HeaderComponent,
    ],
    selector: 'avans-nx-workshop-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'golfing';
}
