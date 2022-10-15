import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.component.html',
  styleUrls: ['./editarperfil.component.scss']
})
export class EditarperfilComponent implements OnInit {
  user: User = {}; 
  api_url = '';
  flag = false;

  constructor(private userService: UserService, private ns: NotificationsService) { }

  ngOnInit(): void {
    this.api_url = this.userService.SV_URL;
    this.userService.getPerfil().subscribe((res : any) => {
      this.user = res;
    }, err => {
      this.ns.notification('error', 'Ha ocurrido un problema', err.error.message)
    })
  }

}
