import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
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

    this.getMyInfo();
  }

  getMyInfo() {
    this.userService.getMyInfoContacto().subscribe((res: any) => {
      this.misformas = res;
    }, err => {
      console.log(err);
    });
  }

  addFormaContacto(form: NgForm) {
    let data = {
      forma_id: form.controls["forma"].value,
      link: form.controls["link"].value.trimStart().trimEnd()
    }

    this.userService.addFormaContacto(data).subscribe(() => {
      this.ns.notification('success', 'Operacion realizada con exito', 'Forma de contacto agregada');
      this.getMyInfo();
      form.reset();
    }, err => {
      this.ns.notification('error', 'Ha ocurrido un problema', err.error.message);
    })
  }

  editarFormaContacto(f: any) {
    f.editar = true;
    console.log(f);
  }

  updateFormaContacto(form: NgForm, f: any) {
    let data = {
      id: f.id,
      link: form.controls["newlink"].value.trimStart().trimEnd()
    }

    this.userService.updateFormaContacto(data).subscribe((res: any) => {
      f.link = data.link;
      f.editar = false;
      this.ns.notification('success', 'Operacion realizada con exito', 'Forma de contacto actualizada');
    }, err => {
      console.log(err);
      this.ns.notification('error', 'Ha ocurrido un problema', err.error.message)  
    })
  }

  stopEdit(f: any) {
    f.editar = false;
  }

  deleteFormaContacto(id: string) {
    this.userService.deleteFormaContacto(id).subscribe(() => {
      this.misformas = this.misformas.filter((item: any) => item.id !== id);
      this.ns.notification('success', 'Operacion realizada con exito', 'Forma de contacto eliminada');
    }, err => {
      console.log(err);
      this.ns.notification('error', 'Ha ocurrido un problema', err.error.message)
    })
  }
}
