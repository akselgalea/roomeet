import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  paths = ['/login', '/register'];
  
  constructor(private userService: UserService, private _location: Location, private ns: NotificationsService) { }

  ngOnInit(): void {
    if(!this.paths.includes(this._location.path())) {
      this.userService.getCantSolicitudesPendientes().subscribe((res: any) => {
        if(res > 0) this.ns.notification('info', 'Te recordamos ver tus solicitudes', 'Tienes ' + res + ' solicitudes pendientes');
      }, err => {
        console.log(err);
      })
    }
  }

}
