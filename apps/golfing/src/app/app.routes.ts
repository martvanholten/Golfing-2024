import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "@avans-nx-workshop/frontend/ui";
import { AboutComponent } from "@avans-nx-workshop/frontend/ui";
import { ErrorComponent } from "@avans-nx-workshop/frontend/ui";
import { UserDetailsComponent } from "@avans-nx-workshop/frontend/features";
import { UserDetailsSmallComponent } from "@avans-nx-workshop/frontend/features";
import { UserColumnsComponent } from "@avans-nx-workshop/frontend/features";
import { UserUpdateComponent } from "@avans-nx-workshop/frontend/features";
import { LocationDetailsComponent } from "@avans-nx-workshop/frontend/features";
import { LocationDetailsSmallComponent } from "@avans-nx-workshop/frontend/features";
import { LocationColumnsComponent } from "@avans-nx-workshop/frontend/features";
import { GameColumnsComponent } from "@avans-nx-workshop/frontend/features";
import { GameDetailsComponent } from "@avans-nx-workshop/frontend/features";
import { GameDetailsSmallComponent } from "@avans-nx-workshop/frontend/features";
import { GameUpdateComponent } from "@avans-nx-workshop/frontend/features";
import { TeamColumnsComponent } from "@avans-nx-workshop/frontend/features";
import { TeamDetailsComponent } from "@avans-nx-workshop/frontend/features";
import { TeamDetailsSmallComponent } from "@avans-nx-workshop/frontend/features";
import { TeamUpdateComponent } from "@avans-nx-workshop/frontend/features";
import { LoginComponent } from "@avans-nx-workshop/frontend/features";
import { LogoutComponent } from "@avans-nx-workshop/frontend/features";

export const appRoutes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "home" },
    { path: "home", pathMatch: "full", component: DashboardComponent },
    { path: "home/:id", pathMatch: "full", redirectTo: "teams/:id/detail" },
    { path: "home/:name/:location", pathMatch: "full", redirectTo: "games/:name/:location/detail" },
    { path: "about", pathMatch: "full", component: AboutComponent },
    { path: "teams/new", pathMatch: "full", component: TeamUpdateComponent },
    { 
        path: "teams", 
        component: TeamColumnsComponent, 
        children: [
            { path: ":id", pathMatch: "full", component: TeamDetailsSmallComponent },
        ],
    },
    { path: "teams/:id/detail", pathMatch: "full", component: TeamDetailsComponent },
    { path: "teams/:id/detail/edit", pathMatch: "full", component: TeamUpdateComponent },
    { path: "games/new", pathMatch: "full", component: GameUpdateComponent },
    { 
        path: "games", 
        component: GameColumnsComponent, 
        children: [
            { path: ":name/:location", pathMatch: "full", component: GameDetailsSmallComponent },
        ],
    },
    { path: "games/:name/:location/detail", pathMatch: "full", component: GameDetailsComponent },
    { path: "games/:name/:location/detail/edit", pathMatch: "full", component: GameUpdateComponent },
    { 
        path: "locations", 
        component: LocationColumnsComponent, 
        children: [
            { path: ":id", pathMatch: "full", component: LocationDetailsSmallComponent },
        ],
    },
    { path: "locations/:id/detail", pathMatch: "full", component: LocationDetailsComponent },
    { path: "users/register", pathMatch: "full", component: UserUpdateComponent },
    { path: "users/login", pathMatch: "full", component: LoginComponent },
    { path: "users/logout", pathMatch: "full", component: LogoutComponent },
    { 
        path: "users", 
        component: UserColumnsComponent,
        children: [
            { path: ":id", pathMatch: "full", component: UserDetailsSmallComponent },
        ],
    },
    { path: "users/:id/detail", pathMatch: "full", component: UserDetailsComponent },
    { path: "users/:id/detail/edit", pathMatch: "full", component: UserUpdateComponent },
    { path: "**", component:  ErrorComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
