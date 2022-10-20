import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent implements OnInit {
  users: any = [];
  api_url = '';
  constructor(private userService: UserService, private ns: NotificationsService, private router: Router) { }

  ngOnInit(): void {
    this.api_url = this.userService.SV_URL;
    this.userService.getFavoritos().subscribe(
      res => {
        this.users = res;
      },
      err => console.log(err)
    );
  }

  delFav(id: string) {
    this.userService.deleteFavorito(id).subscribe((res: any) => {
      this.ns.notification('success', 'Operacion realizada con exito', res.message);
      this.ngOnInit()
    }, err => {
      this.ns.notification('error', 'Ha ocurrido un error', err.error.message);
    })
  }

  pedirContacto(id: string) {
    this.userService.createSolicitud(id).subscribe((res: any) => {
      this.ns.notification('success', 'Operacion realizada con exito', res.message)
    }, err => {
      console.log(err);
      this.ns.notification('error', 'Ha ocurrido un error', err.error.message)
    })
  }
}
