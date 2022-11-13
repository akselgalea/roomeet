import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UserService } from 'src/app/services/user.service';
import * as SHA256 from 'crypto-js/sha256';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  type = "password";
  passValida = true;

  constructor(private userService: UserService, private ns:NotificationsService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(register: NgForm) {
    let data : User = {
      username: register.controls["username"].value,
      email: register.controls["email"].value,
      password: SHA256(register.controls["password"].value).toString()
    }
    if (this.validarCampo(data.username || '', data.password || '')) {
      this.userService.registerUser(data).subscribe((res: any) => {
        this.ns.notification('success', res.message, 'Has sido registrado correctamente');
        this.userService.login(data).subscribe((res: any) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/preferencias']);
        }, err => {
          this.ns.notification('error', 'Ha ocurrido un error', err.error.message);
          this.router.navigate(['/login'])
        })
      }, err => {
        this.ns.notification('error', 'Ha ocurrido un error', err.error.message)
      })
    } else this.ns.notification('error', 'Ha ocurrido un error', 'Has ingresado los datos incorrectamente');
  }

  setType() {
    if(this.type === "password") this.type = "text";
    else this.type = "password";
  }

  validarCampo(username: string, password: string) {
    let re_u = new RegExp("^([a-z0-9]{6,20})$");
    if(!re_u.test(username)) return false;
    if(password.slice(-1) == ' ' || password.slice(1) == ' ') {
      this.passValida = false;
      return false;
    }
    
    return true;
  }
}
