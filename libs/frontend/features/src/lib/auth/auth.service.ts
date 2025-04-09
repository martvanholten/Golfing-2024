import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { Router } from '@angular/router';
import { ApiResponseInterface, LoginDataInterface, UserInterface } from '@avans-nx-workshop/shared/interfaces';

export const httpOptionsAuth = {
    observe: 'body',
    responseType: 'json',
};

@Injectable({
  providedIn: 'root',
})

export class AuthService {
    public currentUser$ = new BehaviorSubject<UserInterface | undefined>(undefined);
    private readonly CURRENT_USER = 'currentuser';
    private readonly CURRENT_TOKEN = 'currenttoken';
    private endpoint = environment.dataApiUrl + "/user";
    private readonly headers = new HttpHeaders({
        'Content-type': 'application/json',
    });

    constructor(private http: HttpClient, private route: Router) {
        this.getUserFromLocalStorage().pipe(
            switchMap((user: UserInterface | undefined) => {
                if(user){
                    this.currentUser$.next(user);
                    return of(user)
                }else{
                    return of(undefined)
                }
            }),
            catchError(this.handleError)
        ).subscribe();
    }

    public login(loginData: LoginDataInterface, options?: any): Observable<ApiResponseInterface<UserInterface>> {
        console.log("login method")
        return this.http
            .put<ApiResponseInterface<UserInterface>>(
                this.endpoint + "/login", 
                loginData, 
                {
                ...options,
                ...httpOptionsAuth,
                }
            )
            .pipe(
                map((response: any) => {
                    if(response.message === "succes"){
                        this.saveUserToLocalStorage(response.results, response.token);
                        this.currentUser$.next(response.results);
                    }
                    return response
                }),
                catchError(this.handleError)
            );
    }

    public getUserFromLocalStorage(): Observable<UserInterface | undefined>{
        return of(JSON.parse(localStorage.getItem(this.CURRENT_USER)!))
    }

    public getTokenFromLocalStorage(): Observable<string | undefined>{
        return of(localStorage.getItem(this.CURRENT_TOKEN)!)
    }

    saveUserToLocalStorage(user: UserInterface, token: string): void{
        localStorage.setItem(this.CURRENT_USER, JSON.stringify(user))
        localStorage.setItem(this.CURRENT_TOKEN, token)
    }

    logout(): void{
        localStorage.removeItem(this.CURRENT_USER);
        localStorage.removeItem(this.CURRENT_TOKEN);
        this.currentUser$.next(undefined);
    }

    userMayEdit(itemUserId: string): Observable<boolean>{
        return this.currentUser$.pipe(
                map((user: UserInterface | undefined) => (user ? user._id === itemUserId : false)),
                catchError(this.handleError)
        )
    }

    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in MealService', error);

        return throwError(() => new Error(error.message));
    }
}