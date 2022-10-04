import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/User'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  type = "password";

  constructor(private userService: UserService, private toast: NgToastService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(login: NgForm) {
    let data : User = {
      username: login.controls["username"].value,
      password: login.controls["password"].value
    }

    this.userService.login(data).subscribe((res: any)=> {
      this.notification('success', 'Iniciando sesion', 'Datos ingresados correctamente');
      localStorage.setItem('token', res.token);

      this.router.navigate(['/perfil']);
    }, err => {
      this.notification('error', 'Ha ocurrido un error', err.error.message)
    });
  }

  setType() {
    if(this.type === "password") this.type = "text";
    else this.type = "password";
  }

  notification(type: string, title: string, message: string) {
    switch(type) {
      case 'warning':
        this.toast.warning({detail: title, summary: message, position: 'tr', duration: 3000});
        break;
      
      case 'success':
        this.toast.success({detail: title, summary: message, position: 'tr', duration: 3000});
        break;

      case 'error':
        this.toast.error({detail: title, summary: message, position: 'tr', duration: 3000});
        break;
      
      case 'info':
        this.toast.info({detail: title, summary: message, position: 'tr', duration: 3000});
        break;
    }
  }
}
