import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Favorito, User } from '../models/User';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URI = 'http://localhost:3000/api';
  ASSETS = '../assets/images/users';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }
  //User
  login(user: User) { return this.http.post(`${this.API_URI}/users/login`, user); }
  logOut() { localStorage.setItem('token', ''); }

  isLogged(): boolean {
    const token = localStorage.getItem('token') || '';
    if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')) {
      return false;
    }

    return true;
  }

  registerUser(user: User) { return this.http.post(`${this.API_URI}/users/register`, user); }

  getUsers() { return this.http.get(`${this.API_URI}/users`); }
  getPerfil() { return this.http.get(`${this.API_URI}/users/perfil`); }
  getUser(id: string) { return this.http.get(`${this.API_URI}/users/perfil/${id}`); }
  updateUser(id: string, updatedUser: User): Observable<User> { return this.http.put(`${this.API_URI}/users/${id}`, updatedUser); }
  deleteUser(id: string) { return this.http.delete(`${this.API_URI}/users/${id}`); }
  
  //Favoritos
  createFavorito(id: string) { return this.http.post(`${this.API_URI}/users/favoritos`, id); }

  //Hobbies
  addHobbie(id: string) { return this.http.post(`${this.API_URI}/users/hobbies/add`, id); }
}
