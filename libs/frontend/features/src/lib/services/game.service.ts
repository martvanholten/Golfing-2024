import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  readonly games: Game[] = [
    {
        date: new Date(2024, 11, 20),
        holes: 18,
        name: 'gameone',
        location: 'bergvlied'
    },
    {
        date: new Date("11/23/2024"),
        holes: 18,
        name: 'gametwo',
        location: 'bergvlied'
    },
    {
        date: new Date(2024, 11, 30),
        holes: 18,
        name: 'gamethree',
        location: 'bergvlied'
    },
    {
        date: new Date(),
        holes: 18,
        name: 'gamefour',
        location: 'bergvlied'
    },
  ];

  constructor() {}

  async getGames(): Promise<Game[]> {
    return this.games;
  }

  async getGamesThisWeek(): Promise<Game[]> {
    return this.games
    .filter((g) => {
        var date = new Date()
        if(g.date != null){
            if(g.date > date){
                return true;
            }
        }
        return false;
    })
    ;
  }

  async getGamesAsObservable(): Promise<Observable<Game[]>> {
    return of(this.games);
  }

  async getGameOneGame(name: string, location: string): Promise<Game> {
    //DOES NOT WORK
    return this.games.filter((game) => game.name?.match(name) && game.location?.match(location))[0];
  }
}