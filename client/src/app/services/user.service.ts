import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/User';
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
  getUsers(config: any) { return this.http.post(`${this.API_URI}/users/buscador`, {config: config}); }
  getPerfil() { return this.http.get(`${this.API_URI}/users/perfil`); }
  getUser(id: string) { return this.http.get(`${this.API_URI}/users/perfil/${id}`); }
  updateUser(user: User) { return this.http.put(`${this.API_URI}/users`, {user: user}); }
  deleteUser(id: string) { return this.http.delete(`${this.API_URI}/users/${id}`); }
  
  //Favoritos
  isFavorito(id: string) { return this.http.get(`${this.API_URI}/users/favorito/${id}`); }
  getFavoritos() { return this.http.get(`${this.API_URI}/users/favoritos`); }
  createFavorito(id: string) { return this.http.post(`${this.API_URI}/users/favoritos`, {favorito: id}); }
  deleteFavorito(id: string) { return this.http.delete(`${this.API_URI}/users/favoritos/${id}`); }
  
  //Hobbies
  getHobbies() { return this.http.get(`${this.API_URI}/users/hobbies/all`); }
  getMyHobbies() { return this.http.get(`${this.API_URI}/users/hobbies`); }
  addHobbie(id: string) { return this.http.post(`${this.API_URI}/users/hobbies/add`, {hobbie_id: id}); }
  createHobbie(data: any) { return this.http.post(`${this.API_URI}/users/hobbies`, data); }
  removeHobbie(id: string) { return this.http.delete(`${this.API_URI}/users/hobbies/remove/${id}`); }
  
  //Fotos
  getFotos() { return this.http.get(`${this.API_URI}/users/images`); }
  updateFoto(id: string, desc: string) { return this.http.put(`${this.API_URI}/users/images/${id}`, {description: desc}); }
  updateFotoPerfil(img: any) { return this.http.put(`${this.API_URI}/users/foto-perfil`, img); }
  uploadImg(img: any) { return this.http.post(`${this.API_URI}/users/upload-image`, img); }
  deleteFoto(id: string, link: string) {
    // this.http.delete(`${this.API_URI}/users/images/del/${link}`);
    return this.http.delete(`${this.API_URI}/users/images/${id}`);
  }

  //Solicitudes
  getSolicitudes() { return this.http.get(`${this.API_URI}/users/solicitudes`); }
  getCantSolicitudesPendientes() { return this.http.get(`${this.API_URI}/users/solicitudes/pendientes`); }
  createSolicitud(id: string) { return this.http.post(`${this.API_URI}/users/solicitud`, {id: id}); }
  updateSolicitud(id: number, opt: number) { return this.http.put(`${this.API_URI}/users/solicitud/${id}`, {estado: opt}); }
  deleteSolicitud(id: string) { return this.http.delete(`${this.API_URI}/users/solicitud/${id}`)}
  deleteSolicitudByUserId(id: string) { return this.http.delete(`${this.API_URI}/users/solicitud/user/${id}`)}

  //Info contacto
  getInfoContacto(id: string) { return this.http.get(`${this.API_URI}/users/${id}/contacto`); }
  getMyInfoContacto() { return this.http.get(`${this.API_URI}/users/contacto`); }
  addFormaContacto(forma: any) { return this.http.post(`${this.API_URI}/users/contacto`, {forma: forma});}
  updateFormaContacto(data: any) { return this.http.put(`${this.API_URI}/users/contacto/${data.id}`, {link: data.link}); }
  getFormasContacto() { return this.http.get(`${this.API_URI}/users/formas-contacto`); }
  deleteFormaContacto(id: string) { return this.http.delete(`${this.API_URI}/users/formas-contacto/${id}`); }

  //Buscador Config
  getBuscadorConfig() { return this.http.get(`${this.API_URI}/users/configuracion/buscador`); }
  createBuscadorConfig(config: any) { return this.http.post(`${this.API_URI}/users/configuracion/buscador`, {config: config}); }
  updateBuscadorConfig(config: any) { return this.http.put(`${this.API_URI}/users/configuracion/buscador`, {config: config}); }
}
