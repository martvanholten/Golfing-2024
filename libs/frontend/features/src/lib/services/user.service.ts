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

  async getUsers(): Promise<User[]> {
    return this.users;
  }

  async getUsersAsObservable(): Promise<Observable<User[]>> {
    return of(this.users);
  }

  async getUserById(id: number): Promise<User> {
    return this.users.filter((user) => user.id === id)[0];
  }
}