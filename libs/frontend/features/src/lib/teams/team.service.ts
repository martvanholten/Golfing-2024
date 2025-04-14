import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { ApiResponseInterface, CreateTeamInterface, TeamInterface } from '@avans-nx-workshop/shared/interfaces';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export const httpOptionsTeam = {
    observe: 'body',
    responseType: 'json',
};

@Injectable({
  providedIn: 'root',
})
export class TeamService {
    endpoint = environment.dataApiUrl + "/team";

    constructor(private readonly http: HttpClient) {}

    public getAll(options?: any): Observable<ApiResponseInterface<TeamInterface[]>> {
        console.log(`read ${this.endpoint}`);
        return this.http
            .get<ApiResponseInterface<TeamInterface[]>>(this.endpoint, {
                ...options,
                ...httpOptionsTeam,
            })
            .pipe(
                map((response: any) => response as ApiResponseInterface<TeamInterface[]>),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    public getTopFive(options?: any): Observable<ApiResponseInterface<TeamInterface[]>> {
        console.log(`read ${this.endpoint}/top`);
        return this.http
            .get<ApiResponseInterface<TeamInterface[]>>(this.endpoint + "/top", {
                ...options,
                ...httpOptionsTeam,
            })
            .pipe(
                map((response: any) => response as ApiResponseInterface<TeamInterface[]>),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    public getOne(_id: string, options?: any): Observable<ApiResponseInterface<TeamInterface>> {
        console.log(`read ${this.endpoint}`);
        return this.http
            .get<ApiResponseInterface<TeamInterface>>(this.endpoint + "/" + _id, {
                ...options,
                ...httpOptionsTeam,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response as ApiResponseInterface<TeamInterface>),
                catchError(this.handleError)
            );
    }

    public updateOne(userId: string, team: TeamInterface, options?: any): Observable<ApiResponseInterface<TeamInterface>> {
        console.log('UPDATED TEAM');
        console.log(team);
        console.log(`read ${this.endpoint}`);
        return this.http
            .put<ApiResponseInterface<TeamInterface>>(this.endpoint + "/" + userId, team, {
                ...options,
                ...httpOptionsTeam,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response as ApiResponseInterface<TeamInterface>),
                catchError(this.handleError)
            );
    }

    public createOne(team: CreateTeamInterface, options?: any): Observable<ApiResponseInterface<TeamInterface>> {
        console.log('NEW TEAM');
        console.log(team);
        console.log(`read ${this.endpoint}`);
        return this.http
            .post<ApiResponseInterface<TeamInterface>>(this.endpoint, team, {
                ...options,
                ...httpOptionsTeam,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response as ApiResponseInterface<TeamInterface>),
                catchError(this.handleError)
            );
    }

    public deleteOne(_id: string, options?: any): Observable<ApiResponseInterface<TeamInterface>> {
        console.log(`delete ${this.endpoint}/${_id}`);
        return this.http
            .delete<ApiResponseInterface<TeamInterface>>(this.endpoint + `/${_id}`, {
                ...options,
                ...httpOptionsTeam,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response as ApiResponseInterface<TeamInterface>),
                catchError(this.handleError)
            );
    }

    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in MealService', error);

        return throwError(() => new Error(error.message));
    }
}