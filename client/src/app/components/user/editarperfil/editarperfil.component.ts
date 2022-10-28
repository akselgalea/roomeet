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
      console.log(res);
    }, err => {
      this.ns.notification('error', 'Ha ocurrido un problema', err.error.message)
    })

  }

  editarPerfil(editForm: NgForm) {
    let data = {
      username: editForm.controls["username"].value || this.user.username,
      nombre: editForm.controls["name"].value || this.user.nombre,
      descripcion: editForm.controls["description"].value || this.user.descripcion,
    }
    console.log(data);
  }
}
