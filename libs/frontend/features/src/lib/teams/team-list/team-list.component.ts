import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '@avans-nx-workshop/frontend/features';
import { Team } from '@avans-nx-workshop/frontend/features';
import { TeamInterface } from '@avans-nx-workshop/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-team-list',
    templateUrl: './team-list.component.html',
    styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnDestroy{
    teams: TeamInterface[] = [];
    sub$?: Subscription;

    constructor(
        private route: ActivatedRoute,
        private teamService: TeamService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            //DOES NOT WORK
            // if(!params.keys.indexOf("home")){
                this.sub$ = this.teamService.getAll().subscribe((r) => {
                    console.log(r)
                    if(r.message === "error"){
                        this.router.navigate(['/error']);
                    }else{
                        this.teams = r.results as TeamInterface[];
                    }
                });
            // }else{
            //     this.sub$ = this.teamService.getTopFive().subscribe((r) => {
            //         console.log(r)
            //         if(r.message === "error"){
            //             this.router.navigate(['/error']);
            //         }else{
            //             this.teams = r.results as TeamInterface[];
            //         }
            //     });
            // }
        });
    }

    ngOnDestroy(): void {
        this.sub$?.unsubscribe();
    }
}