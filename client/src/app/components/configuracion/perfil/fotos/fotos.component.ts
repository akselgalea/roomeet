import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.scss']
})
export class FotosComponent implements OnInit {
  api_url = '';
  fotos: any = [];
  constructor(private userService: UserService, private ns: NotificationsService) { }

  ngOnInit(): void {
    this.api_url = this.userService.SV_URL;
    this.userService.getFotos().subscribe((res: any) => {
      this.fotos = res;
      console.log(this.fotos);
    })
  }

  updateFoto(form: NgForm, foto: any) {
    this.userService.updateFoto(foto.id, form.controls['description'].value).subscribe((res: any) => {
      foto.descripcion = form.controls['description'].value;
      foto.editar = false;
      this.ns.notification('success', 'Operacion realizada con exito', 'La foto ha sido actualizada');
    }, err => {
      console.log(err);
      this.ns.notification('error', 'Ha ocurrido un error', err.error.message)
    })
  }

  editFoto(foto: any) {
    foto.editar = true;
  }

  stopEdit(foto: any) {
    foto.editar = false;
  }
  
  deleteFoto(id: string, link: string) {
    this.userService.deleteFoto(id, link).subscribe((res: any) => {
      this.fotos = this.fotos.filter((item: any) => item.id !== id);
      this.ns.notification('success', 'Operacion realizada con exito', 'La foto ha sido eliminada correctamente');
    }, err => {
      console.log(err);
      this.ns.notification('error', 'Ha ocurrido un error', err.error.message);
    })
  }
}
