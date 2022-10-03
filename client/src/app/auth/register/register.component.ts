import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  type = "password";
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(register: NgForm) {
    console.log(register);
  }

  setType() {
    if(this.type === "password") this.type = "text";
    else this.type = "password";
  }
}
