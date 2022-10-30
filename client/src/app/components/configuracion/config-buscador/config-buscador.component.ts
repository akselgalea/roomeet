import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-config-buscador',
  templateUrl: './config-buscador.component.html',
  styleUrls: ['./config-buscador.component.scss']
})
export class ConfigBuscadorComponent implements OnInit {
  config: any = {
    sexo: 2,
    fumador: 1,
    bebedor: 1,
    fiestas: 1,
    mascotas: 1,
    hijos: 1
  };

  noconfig = false;

  constructor(private userService: UserService, private ns: NotificationsService) { }

  ngOnInit(): void {
    this.userService.getBuscadorConfig().subscribe((res: any) => {
      if(res) this.config = res;
      else this.noconfig = true;
    }, err => {
      this.ns.notification('error', 'Ha ocurrido un error', err.error.message);
    })
  }

  saveConfig(form: NgForm) {
    let data = {
      sexo: form.controls["sex"].pristine ? this.config.sexo : form.controls["sex"].value,
      fumador: form.controls["smokes"].pristine ? this.config.fumador : form.controls["smokes"].value,
      bebedor: form.controls["drinks"].pristine ? this.config.bebedor : form.controls["drinks"].value,
      fiestas: form.controls["parties"].pristine ? this.config.fiestas : form.controls["parties"].value,
      mascotas: form.controls["pets"].pristine ? this.config.mascotas : form.controls["pets"].value,
      hijos: form.controls["childs"].pristine ? this.config.hijos : form.controls["childs"].value  
    }

    if(this.noconfig) {
      this.userService.createBuscadorConfig(data).subscribe((res: any) => {
        this.ns.notification('success', 'Configuracion guardada con exito', 'Ahora podras encontrar a tu roomie ideal')
      }, err => {
        this.ns.notification('error', 'Ha ocurrido un error', err.error.message);
      })
    } else {
      this.userService.updateBuscadorConfig(data).subscribe((res: any) => {
        this.ns.notification('success', 'Configuracion guardada con exito', 'Ahora podras encontrar a tu roomie ideal')
      }, err => {
        this.ns.notification('error', 'Ha ocurrido un error', err.error.message);
      })
    }
  }
}
