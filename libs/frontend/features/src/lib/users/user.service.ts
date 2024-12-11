import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponseInterface, CreateUserInterface, UserInterface } from '@avans-nx-workshop/shared/interfaces';
import { Injectable } from '@angular/core';
import { environment } from '@avans-nx-workshop/shared/util-env';

/**
 * See https://angular.io/guide/http#requesting-data-from-a-server
 */
export const httpOptionsUser = {
    observe: 'body',
    responseType: 'json',
};

@Injectable({
  providedIn: 'root',
})

export class UserService {
    endpoint = environment.dataApiUrl + "/user";

    constructor(private readonly http: HttpClient) {}

    public getAll(options?: any): Observable<ApiResponseInterface<UserInterface[]>> {
        console.log(`get all users`);
        return this.http
            .get<ApiResponseInterface<UserInterface[]>>(this.endpoint, {
                ...options,
                ...httpOptionsUser,
            })
            .pipe(
                map((response: any) => response as ApiResponseInterface<UserInterface[]>),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    public getOne(_id: string, options?: any): Observable<ApiResponseInterface<UserInterface>> {
        console.log(`read ${this.endpoint}`);
        return this.http
            .get<ApiResponseInterface<UserInterface>>(this.endpoint + "/" + _id, {
                ...options,
                ...httpOptionsUser,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response as ApiResponseInterface<UserInterface>),
                catchError(this.handleError)
            );
    }

    public updateOne(user: UserInterface, options?: any): Observable<ApiResponseInterface<UserInterface>> {
        console.log(`read ${this.endpoint}`);
        return this.http
            .put<ApiResponseInterface<UserInterface>>(this.endpoint + "/" + user._id, user, {
                ...options,
                ...httpOptionsUser,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response as ApiResponseInterface<UserInterface>),
                catchError(this.handleError)
            );
    }

    public createOne(user: CreateUserInterface, options?: any): Observable<ApiResponseInterface<UserInterface>> {
        console.log(`read ${this.endpoint}`);
        return this.http
            .post<ApiResponseInterface<UserInterface>>(this.endpoint, user, {
                ...options,
                ...httpOptionsUser,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response as ApiResponseInterface<UserInterface>),
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in MealService', error);

        return throwError(() => new Error(error.message));
    }
}