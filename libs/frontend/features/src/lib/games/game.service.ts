import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { ApiResponseInterface, CreateGameInterface, GameInterface } from '@avans-nx-workshop/shared/interfaces';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@avans-nx-workshop/shared/util-env';

export const httpOptionsGame = {
  observe: 'body',
  responseType: 'json',
};

@Injectable({
  providedIn: 'root',
})
export class GameService {
    endpoint = environment.dataApiUrl + "/location";

    constructor(private readonly http: HttpClient) {}

    public getAll(options?: any): Observable<ApiResponseInterface<GameInterface[]>> {
        console.log(`read ${this.endpoint}/game`);
        return this.http
            .get<ApiResponseInterface<GameInterface[]>>(this.endpoint + "/game", {
                ...options,
                ...httpOptionsGame,
            })
            .pipe(
                map((response: any) => response as ApiResponseInterface<GameInterface[]>),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    public getThisWeek(options?: any): Observable<ApiResponseInterface<GameInterface[]>> {
        console.log(`read ${this.endpoint}`);
        return this.http
            .get<ApiResponseInterface<GameInterface[]>>(this.endpoint + "/game" + "/week", {
                ...options,
                ...httpOptionsGame,
            })
            .pipe(
                map((response: any) => response as ApiResponseInterface<GameInterface[]>),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    public getOne(name: string, location: string, options?: any): Observable<ApiResponseInterface<GameInterface>> {
        console.log(`read ${this.endpoint}`);
        return this.http
            .get<ApiResponseInterface<GameInterface>>(this.endpoint + "/" + location + "/game/" + name, {
                ...options,
                ...httpOptionsGame,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response as ApiResponseInterface<GameInterface>),
                catchError(this.handleError)
            );
    }

    public createOne(locationId: string, game: CreateGameInterface, options?: any): Observable<ApiResponseInterface<GameInterface>> {
        console.log(`TEST`);
        console.log(`read ${this.endpoint}`);
        return this.http
            .post<ApiResponseInterface<GameInterface>>(this.endpoint + "/" + locationId + '/game', game, {
                ...options,
                ...httpOptionsGame,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response as ApiResponseInterface<GameInterface>),
                catchError(this.handleError)
            );
    }

    public updateOne(locationId: string, gameName: string, game: GameInterface, options?: any): Observable<ApiResponseInterface<GameInterface>> {
        console.log(`read ${this.endpoint}`);
        return this.http
            .put<ApiResponseInterface<GameInterface>>(this.endpoint + "/" + locationId + "/game/" + gameName, game, {
                ...options,
                ...httpOptionsGame,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response as ApiResponseInterface<GameInterface>),
                catchError(this.handleError)
            );
    }

    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in MealService', error);

        return throwError(() => new Error(error.message));
    }
}