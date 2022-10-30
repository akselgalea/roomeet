import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-configuracion-contacto',
  templateUrl: './configuracion-contacto.component.html',
  styleUrls: ['./configuracion-contacto.component.scss']
})
export class ConfiguracionContactoComponent implements OnInit {
  formas: any = [];
  misformas: any = [];
  constructor(private userService: UserService, private ns: NotificationsService) { }

  ngOnInit(): void {
    this.userService.getFormasContacto().subscribe((res: any) => {
      this.formas = res;
    }, err => {
      console.log(err);
    });

    this.userService.getMyInfoContacto().subscribe((res: any) => {
      this.misformas = res;
    }, err => {
      console.log(err);
    });
  }

  addFormaContacto(form: NgForm) {
    console.log(form.controls);
  }

  editarFormaContacto() {
    console.log("works");
  }

  deleteFormaContacto(id: string) {
    console.log(id);
    this.userService.deleteFormaContacto(id).subscribe(() => {
      this.ns.notification('success', 'Operacion realizada con exito', 'Forma de contacto eliminada')
    }, err => {
      console.log(err);
      this.ns.notification('error', 'Ha ocurrido un problema', err.error.message)
    })
  }
}
