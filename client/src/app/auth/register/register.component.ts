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
  constructor(private userService: UserService, private ns:NotificationsService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(register: NgForm) {
    let data : User = {
      username: register.controls["username"].value,
      email: register.controls["email"].value,
      password: SHA256(register.controls["password"].value).toString()
    }

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
  }

  setType() {
    if(this.type === "password") this.type = "text";
    else this.type = "password";
  }
}
