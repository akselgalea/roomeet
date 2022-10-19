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
    this.userService.getPerfil().subscribe((res : any) => {
      this.user = res;
    }, err => {
      this.ns.notification('error', 'Ha ocurrido un problema', err.error.message)
    })
  }

  comfirmPass(passForm: NgForm) {
    this.userService.comfirmPass(SHA256(passForm.controls["password"].value).toString()).subscribe((res: any) => {
      this.ns.notification('success', res.message, 'Ahora puedes editar tu perfil');
      this.confirmed = true;
    }, err => {
      this.ns.notification('error', 'Contraseña incorrecta', err.error.message);
    })
  }

  setType() {
    if(this.type === "password") this.type = "text";
    else this.type = "password";
  }
}
