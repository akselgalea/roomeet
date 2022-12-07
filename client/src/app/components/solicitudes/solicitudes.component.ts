import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent implements OnInit {
  solicitudes: any = {
    //Solicitudes que me hicieron
    solis: [],
    //Solicitudes que hice
    mysolis: []
  };

  showInfo: boolean = false;
  info: any = [];
  api_url = '';

  constructor(private userService: UserService, private ns: NotificationsService) { }

  ngOnInit(): void {
    this.api_url = this.userService.SV_URL;
    this.userService.getSolicitudes().subscribe((res: any) => {
      this.solicitudes = res;
    }, err => {
      console.log(err);
    })
  }

  acceptSol(solicitud: any) {
    solicitud.estado = 1;

    this.userService.updateSolicitud(solicitud.id, 1).subscribe((res: any) => {
      this.ns.notification('success', res.message, 'Ahora este usuario podra ver tu informacion de contacto');
    }, err => {
      this.ns.notification('error', 'Ha ocurrido un error', err.error.message);
    })
  }

  revocarPermiso(solicitud: any) {
    solicitud.estado = 0;

    this.userService.updateSolicitud(solicitud.id, 0).subscribe((res: any) => {
      this.ns.notification('success', 'Permisos revocados con exito', 'Este usuario ya no podra ver tu informacion de contacto');
    }, err => {
      this.ns.notification('error', 'Ha ocurrido un error', err.error.message);
    })
  }

  rechazarSol(solicitud: any) {
    solicitud.estado = 2;

    this.userService.updateSolicitud(solicitud.id, 2).subscribe((res: any) => {
      this.solicitudes.solis = this.solicitudes.solis.filter((item: any) => item.id !== solicitud.id);
      this.ns.notification('success', 'Solicitud rechazada con exito', 'Este usuario no podra ver tu informacion de contacto');
    }, err => {
      this.ns.notification('error', 'Ha ocurrido un error', err.error.message);
    })
  }

  eliminarSol(id: string) {
    this.userService.deleteSolicitud(id).subscribe((res: any) => {
      this.ns.notification('success', 'Operacion realizada con exito', res.message);
      this.solicitudes.mysolis = this.solicitudes.mysolis.filter((item: any) => item.id !== id);
    }, err => {
      this.ns.notification('error', 'Ha ocurrido un error', err.error.message);
    })
  }

  verInfoContacto(id: string) {
    this.userService.getInfoContacto(id).subscribe((res: any) => {
      this.showInfo = true;
      this.info = res;
    })
  }

  async copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      this.ns.notification('success', 'Operacion realizada con exito', 'Texto copiado!');
    } catch (err) {
      this.ns.notification('error', 'Ha ocurrido un error', '');
    }
  }

  closeInfo() {
    this.showInfo = false;
  }

}
