import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { LoginData, User } from '@avans-nx-workshop/frontend/features';
import { Router } from '@angular/router';
import { ApiResponseInterface, LoginDataInterface, UserInterface } from '@avans-nx-workshop/shared/interfaces';

/**
 * See https://angular.io/guide/http#requesting-data-from-a-server
 */

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

    public login(loginData: LoginDataInterface, options?: any): Observable<ApiResponseInterface<User>> {
        console.log("login method")
        return this.http
            .post<ApiResponseInterface<User>>(
                this.endpoint + "/login", 
                loginData, 
                // { headers: this.headers },
                {
                ...options,
                ...httpOptionsAuth,
                }
            )
            .pipe(
                map((response: any) => {
                    if(response.message === "succes"){
                        this.saveUserToLocalStorage(response.results);
                        this.currentUser$.next(response.results);
                    }
                    console.log("user: " + response.results)
                    return response
                }),
                catchError(this.handleError)
            );
    }

    // login(loginData: LoginDataInterface): Observable<UserInterface | undefined>{
    //     return this.http
    //         .post<UserInterface>(
    //             this.endpoint + "/login", 
    //             loginData,
    //             // { headers: this.headers }
    //         )
    //         .pipe(
    //             map((user) => {
    //                 this.saveUserToLocalStorage(user);
    //                 this.currentUser$.next(user);
    //                 return user
    //             }),
    //             catchError((error: any) => {
    //                 console.log(error.message)
    //                 return of(undefined)
    //             })
    //         );
    // }

    // Could add a register, or add it in user service and login through there

    getUserFromLocalStorage(): Observable<UserInterface | undefined>{
        if(localStorage.getItem(this.CURRENT_USER) !== null && JSON.parse(localStorage.getItem(this.CURRENT_USER)!) instanceof User){
            return of(JSON.parse(localStorage.getItem(this.CURRENT_USER)!))
        }else{
            return of(undefined)
        }
    }

    saveUserToLocalStorage(user: UserInterface): void{
        localStorage.setItem(this.CURRENT_USER, JSON.stringify(user))
    }

    // Ask how to remove current user from behavoursubject
    // logout(): void{
    //     localStorage.setItem(this.CURRENT_USER, JSON.stringify(null));
    //     this.currentUser$.
    // }

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