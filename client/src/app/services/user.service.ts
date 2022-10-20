import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Favorito, Foto, User } from '../models/User';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URI = 'http://localhost:3000/api';
  SV_URL = 'http://localhost:3000/';

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
  comfirmPass(pass: string) { return this.http.post(`${this.API_URI}/users/comfirm-pass`, {password: pass}); }
  getUsers() { return this.http.get(`${this.API_URI}/users/buscador`); }
  getPerfil() { return this.http.get(`${this.API_URI}/users/perfil`); }
  getUser(id: string) { return this.http.get(`${this.API_URI}/users/perfil/${id}`); }
  uploadImg(img: any) { return this.http.post(`${this.API_URI}/users/upload-image`, img); }
  updateUser(id: string, updatedUser: User): Observable<User> { return this.http.put(`${this.API_URI}/users/${id}`, updatedUser); }
  deleteUser(id: string) { return this.http.delete(`${this.API_URI}/users/${id}`); }
  
  //Favoritos
  isFavorito(id: string) { return this.http.get(`${this.API_URI}/users/favorito/${id}`); }
  getFavoritos() { return this.http.get(`${this.API_URI}/users/favoritos`); }
  createFavorito(id: string) { return this.http.post(`${this.API_URI}/users/favoritos`, {favorito: id}); }
  deleteFavorito(id: string) { return this.http.delete(`${this.API_URI}/users/favoritos/${id}`); }

  //Hobbies
  addHobbie(id: string) { return this.http.post(`${this.API_URI}/users/hobbies/add`, {hobbie: id}); }

  getSolicitudes() { return this.http.get(`${this.API_URI}/users/solicitudes`); }
  getCantSolicitudesPendientes() { return this.http.get(`${this.API_URI}/users/solicitudes/pendientes`); }
  createSolicitud(id: string) { return this.http.post(`${this.API_URI}/users/solicitud`, {id: id}); }
  updateSolicitud(id: number, opt: number) { return this.http.put(`${this.API_URI}/users/solicitud/${id}`, {estado: opt}); }
}
