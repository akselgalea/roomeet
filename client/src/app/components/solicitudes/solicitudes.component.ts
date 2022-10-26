import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent implements OnInit {
  solicitudes: any = [];
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
      this.ns.notification('success', 'Solicitud rechazada con exito', 'Este usuario no podra ver tu informacion de contacto');
      this.ngOnInit();
    }, err => {
      this.ns.notification('error', 'Ha ocurrido un error', err.error.message);
    })
  }

}
