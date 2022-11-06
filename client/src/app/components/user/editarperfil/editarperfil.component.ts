import { Component, OnInit } from '@angular/core';
import * as SHA256 from 'crypto-js/sha256';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/User';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.component.html',
  styleUrls: ['./editarperfil.component.scss']
})
export class EditarperfilComponent implements OnInit {
  type = "password";
  api_url = '';
  preview: any;
  upload: any;
  confirmed = false;
  user: User = {}; 

  constructor(private userService: UserService, private ns: NotificationsService) { }

  ngOnInit(): void {
    this.api_url = this.userService.SV_URL;
    if(localStorage.getItem('confirmed') === 'true') {
      this.getUser();
      this.confirmed = true;
    }
  }

  comfirmPass(passForm: NgForm) {
    this.userService.comfirmPass(SHA256(passForm.controls["password"].value).toString()).subscribe((res: any) => {
      this.ns.notification('success', 'Datos correctos', 'Ahora puedes editar tu perfil');
      this.getUser();
      this.confirmed = true;
      localStorage.setItem('confirmed', 'true');
    }, err => {
      this.ns.notification('error', 'Contraseña incorrecta', err.error.message);
    })
  }

  setType() {
    if(this.type === "password") this.type = "text";
    else this.type = "password";
  }

  getUser() {
    this.userService.getPerfil().subscribe((res : any) => {
      this.user = res;
      this.preview = this.api_url + res.foto_perfil || 'assets/images/users/default.jpg';
    }, err => {
      this.ns.notification('error', 'Ha ocurrido un problema', err.error.message)
    })
  }

  editarPerfil(editForm: NgForm) {
    let data = {
      username: editForm.controls["username"].value,
      nombre: editForm.controls["name"].value,
      descripcion: editForm.controls["description"].value,
      sexo: editForm.controls["sex"].pristine ? this.user.sexo : editForm.controls["sex"].value,
      profesion: editForm.controls["profession"].pristine ? this.user.profesion : editForm.controls["profession"].value,
      fumador: editForm.controls["smokes"].pristine ? this.user.fumador : editForm.controls["smokes"].value,
      bebedor: editForm.controls["drinks"].pristine ? this.user.bebedor : editForm.controls["drinks"].value,
      fiestas: editForm.controls["parties"].pristine ? this.user.fiestas : editForm.controls["parties"].value,
      mascotas: editForm.controls["pets"].pristine ? this.user.mascotas : editForm.controls["pets"].value,
      hijos: editForm.controls["childs"].pristine ? this.user.hijos : editForm.controls["childs"].value
    }
    
    this.userService.updateUser(data).subscribe(res => {
      this.ns.notification('success', 'Operacion realizada con exito', 'Usuario actualizado!');
    }, err => {
      this.ns.notification('error', 'Ha ocurrido un problema', err.error.message);
    });
  }

  loadImg(event : any) {
    const reader = new FileReader();
    this.upload = event.target.files[0];
    reader.readAsDataURL(event.target.files[0])
    reader.onload = (e: any) => {
      this.preview = e.target.result;
    }
  }

  uploadImg(form: NgForm) {
    const data = new FormData();
    data.append("file", this.upload);

    this.userService.updateFotoPerfil(data).subscribe((res: any) => {
      this.ns.notification('success', res.message, 'Se ha actualizado tu foto de perfil');
      form.reset();
    }, err => {
      this.ns.notification('error', 'Ha ocurrido un error', err.error.message);
    })
  }
}
