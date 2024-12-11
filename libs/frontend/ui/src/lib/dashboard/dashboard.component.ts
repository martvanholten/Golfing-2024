import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesModule } from '@avans-nx-workshop/frontend/features';

@Component({
    selector: 'avans-nx-workshop-dashboard',
    standalone: true,
    imports: [CommonModule, FeaturesModule],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {}
