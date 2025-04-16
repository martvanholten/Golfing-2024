import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './ui/footer/footer.component';
import { HeaderComponent } from './ui/header/header.component';
import { ErrorComponent } from './ui/error/error.component';
import { FeaturesModule } from '@avans-nx-workshop/frontend/features';

@NgModule({
    imports: [
        CommonModule,
        AboutComponent,
        DashboardComponent,
        FooterComponent,
        HeaderComponent,
        ErrorComponent,
        FeaturesModule
    ],

    exports: [
        CommonModule,
        AboutComponent,
        DashboardComponent,
        FooterComponent,
        HeaderComponent,
        ErrorComponent,
    ],
})
export class UiModule {}
