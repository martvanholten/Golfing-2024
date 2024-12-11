import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@avans-nx-workshop/frontend/ui';
import { HeaderComponent } from '@avans-nx-workshop/frontend/ui';

@Component({
    standalone: true,
    imports: [
        RouterModule,
        FooterComponent,
        HeaderComponent,
    ],

    selector: 'avans-nx-workshop-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})


export class AppComponent {
    title = 'golfing';
}
