import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Location } from './location';
import { ApiResponseInterface, LocationInterface } from '@avans-nx-workshop/shared/interfaces';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export const httpOptionsLocation = {
  observe: 'body',
  responseType: 'json',
};

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  endpoint = environment.dataApiUrl + "/location";

    constructor(private readonly http: HttpClient) {}

    public getAll(options?: any): Observable<ApiResponseInterface<LocationInterface[]>> {
        console.log(`read ${this.endpoint}`);
        return this.http
            .get<ApiResponseInterface<LocationInterface[]>>(this.endpoint, {
                ...options,
                ...httpOptionsLocation,
            })
            .pipe(
                map((response: any) => response as ApiResponseInterface<LocationInterface[]>),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    public getOne(_id: string, options?: any): Observable<ApiResponseInterface<LocationInterface>> {
        console.log(`read ${this.endpoint}`);
        return this.http
            .get<ApiResponseInterface<LocationInterface>>(this.endpoint + "/" + _id, {
                ...options,
                ...httpOptionsLocation,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response as ApiResponseInterface<LocationInterface>),
                catchError(this.handleError)
            );
    }

    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in MealService', error);

        return throwError(() => new Error(error.message));
    }
}