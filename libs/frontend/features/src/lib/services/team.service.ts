import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  readonly teams: Team[] = [
    {
        id: 1,
        rank: 1,
        name: "first",
        largeGames: true,
    },
    {
        id: 2,
        rank: 2,
        name: "second",
        largeGames: true,
    },
    {
        id: 5,
        rank: 5,
        name: "fifth",
        largeGames: true,
    },
    {
        id: 7,
        rank: 7,
        name: "seventh",
        largeGames: true,
    },
    {
        id: 3,
        rank: 3,
        name: "thired",
        largeGames: true,
    },
    {
        id: 6,
        rank: 6,
        name: "sixth",
        largeGames: true,
    },
    {
        id: 4,
        rank: 4,
        name: "fourth",
        largeGames: true,
    },
  ];

  constructor() {
    this.teams.sort((t1, t2) => {
        if(t1.rank != null && t2.rank != null){
            if (t1.rank > t2.rank) {
                return 1;
            }else if (t1.rank < t2.rank) {
                return -1;
            }
        }    
        return 0;
    });
  }

  getTeams(): Observable<Team[]> {
    return of(this.teams);
  }

  getTopFiveTeams(): Observable<Team[]> {
    return of(this.teams.sort((t1, t2) => {
        if(t1.rank != null && t2.rank != null){
            if (t1.rank > t2.rank) {
                return 1;
            }else if (t1.rank < t2.rank) {
                return -1;
            }
        }    
        return 0;
    }).slice(0,5));
  }

  getTeamById(id: number): Observable<Team> {
    return of(this.teams.filter((team) => team.id === id)[0]);
  }
}