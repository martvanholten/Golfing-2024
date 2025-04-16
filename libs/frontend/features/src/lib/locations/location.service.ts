import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { ApiResponseInterface, CreateLocationInterface, LocationInterface } from '@avans-nx-workshop/shared/interfaces';
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

    public getOneByName(name: string, options?: any): Observable<ApiResponseInterface<LocationInterface>> {
        console.log(`read ${this.endpoint}`);
        return this.http
            .get<ApiResponseInterface<LocationInterface>>(this.endpoint + "/name/" + name, {
                ...options,
                ...httpOptionsLocation,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response as ApiResponseInterface<LocationInterface>),
                catchError(this.handleError)
            );
    }

    public createOne(location: CreateLocationInterface, options?: any): Observable<ApiResponseInterface<LocationInterface>> {
        console.log(`read ${this.endpoint}`);
        return this.http
            .post<ApiResponseInterface<LocationInterface>>(this.endpoint, location, {
                ...options,
                ...httpOptionsLocation,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response as ApiResponseInterface<LocationInterface>),
                catchError(this.handleError)
            );
    }

    public updateOne(location: LocationInterface, options?: any): Observable<ApiResponseInterface<LocationInterface>> {
        console.log(`read ${this.endpoint}`);
        return this.http
            .put<ApiResponseInterface<LocationInterface>>(this.endpoint + '/' + location._id, location, {
                ...options,
                ...httpOptionsLocation,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response as ApiResponseInterface<LocationInterface>),
                catchError(this.handleError)
            );
    }

    public deleteOne(_id: string, options?: any): Observable<ApiResponseInterface<LocationInterface>> {
        console.log(`read ${this.endpoint}`);
        return this.http
            .delete<ApiResponseInterface<LocationInterface>>(this.endpoint + '/' + _id + '/delete', {
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
        console.log('handleError in LocationService', error);

        return throwError(() => new Error(error.message));
    }
}