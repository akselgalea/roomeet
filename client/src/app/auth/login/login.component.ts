import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../models/User'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  type = "password";

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(login: NgForm) {
    let data : User = {
      username: login.controls["username"].value,
      password: login.controls["password"].value
    }
  }

  setType() {
    if(this.type === "password") this.type = "text";
    else this.type = "password";
  }
}
