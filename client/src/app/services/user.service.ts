import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URI = 'http://localhost:3000/api'
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User> {
    return this.http.get(`${this.API_URI}/users`);
  }

  getUser(id: string): Observable<User> {
    return this.http.get(`${this.API_URI}/users/${id}`);
  }

  registerUser(user: User) {
    return this.http.post(`${this.API_URI}/users/register`, user);
  }

  updateUser(id: string, updatedUser: User): Observable<User> {
    return this.http.put(`${this.API_URI}/users/${id}`, updatedUser);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.API_URI}/users/${id}`);
  }

}
