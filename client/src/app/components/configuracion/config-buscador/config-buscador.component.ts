import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
    fumador: 2,
    bebedor: 2,
    fiestas: 2,
    mascotas: 2,
    hijos: 2
  };

  noconfig = false;

  constructor(private userService: UserService, private ns: NotificationsService, private router: Router) { }

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
        this.ns.notification('success', 'Configuracion guardada con exito', 'Ahora podras encontrar a tu roomie ideal');
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/preferencias/buscador']));
      }, err => {
        this.ns.notification('error', 'Ha ocurrido un error', err.error.message);
      })
    } else {
      this.userService.updateBuscadorConfig(data).subscribe((res: any) => {
        this.ns.notification('success', 'Configuracion guardada con exito', 'Ahora podras encontrar a tu roomie ideal');
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/preferencias/buscador']));
      }, err => {
        this.ns.notification('error', 'Ha ocurrido un error', err.error.message);
      })
    }
  }
}
