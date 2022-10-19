import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  counter = 0;
  paths = ['/login', '/register'];
  
  constructor(private userService: UserService, private _location: Location) { }

  ngOnInit(): void {
    if(!this.paths.includes(this._location.path())) {
      this.userService.getSolicitudesPendientes().subscribe((res: any) => {
        this.counter = res;
      }, err => {
        console.log(err);
      })
    }
  }

}
