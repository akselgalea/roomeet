import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  counter = 0;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getSolicitudesPendientes().subscribe((res: any) => {
      this.counter = res;
    }, err => {
      console.log(err);
    })
  }

}
