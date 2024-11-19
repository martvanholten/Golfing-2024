import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly users: User[] = [
    {
        id: 1,
        firstName: 'One',
        lastName: 'User',
        email: 'userOne@hotmail.com',
        password: 'pass',
        role: 'Guest',
        handicap: 30,
        age: 20,
    },
    {
        id: 2,
        firstName: 'Two',
        lastName: 'User',
        email: 'userOne@hotmail.com',
        password: 'pass',
        role: 'Guest',
        handicap: 30,
        age: 20,
    },
    {
        id: 3,
        firstName: 'Three',
        lastName: 'User',
        email: 'userOne@hotmail.com',
        password: 'pass',
        role: 'Guest',
        handicap: 30,
        age: 20,
    },
  ];

  constructor() {}

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  getUserById(id: number): Observable<User> {
    return of(this.users.filter((user) => user.id === id)[0]);
  }
}