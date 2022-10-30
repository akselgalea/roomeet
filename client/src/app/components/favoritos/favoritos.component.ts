import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { elementAt } from 'rxjs';
import { User } from 'src/app/models/User';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent implements OnInit {
  users: any = [];
  api_url = '';
  showInfo: boolean = false;
  info: any = [];

  constructor(private userService: UserService, private ns: NotificationsService, private router: Router) { }

  ngOnInit(): void {
    this.api_url = this.userService.SV_URL;
    this.userService.getFavoritos().subscribe(
      (res: any) => {
        this.users = res.favs;
        
        for(let i = 0; i < this.users.length; i++) {
          let soli = res.solis.find((soli: any) => soli.id === this.users[i].id);
          if(soli != undefined) {
            if(soli.estado == 1) this.users[i].solicitud = 'aprobada';
            else this.users[i].solicitud = 'pendiente';
          } else this.users[i].solicitud = 'no';
        }
      },
      err => console.log(err)
    );
  }

  delFav(id: string) {
    this.userService.deleteFavorito(id).subscribe((res: any) => {
      this.ns.notification('success', 'Operacion realizada con exito', res.message);
      this.ngOnInit()
    }, err => {
      this.ns.notification('error', 'Ha ocurrido un error', err.error.message);
    })
  }

  pedirContacto(user: any) {
    this.userService.createSolicitud(user.id).subscribe((res: any) => {
      this.ns.notification('success', 'Operacion realizada con exito', res.message);
      user.solicitud = 'pendiente';
    }, err => {
      console.log(err);
      this.ns.notification('error', 'Ha ocurrido un error', err.error.message)
    })
  }

  eliminarSol(user: any) {
    this.userService.deleteSolicitudByUserId(user.id).subscribe((res: any) => {
      this.ns.notification('success', 'Operacion realizada con exito', res.message);
      user.solicitud = 'no';
    }, err => {
      console.log(err);
      this.ns.notification('error', 'Ha ocurrido un error', err.error.message)
    })
  }

  verInfoContacto(id: string) {
    this.userService.getInfoContacto(id).subscribe((res: any) => {
      this.showInfo = true;
      this.info = res;
    })
  }

  closeInfo() {
    this.showInfo = false;
  }
  
}
