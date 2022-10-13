import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {
  users: any = [];
  api_url = '';
  constructor(private userService: UserService, private ns: NotificationsService) { }

  ngOnInit(): void {
    this.api_url = this.userService.SV_URL;
    this.userService.getUsers().subscribe(
      res => {
        this.users = res;
      },
      err => {
        this.ns.notification('error', 'Ha ocurrido un error', err.error.message)
      }
    );
  }

  addToFav(id: any) {
    this.userService.createFavorito(id).subscribe((res: any) => {
      this.ns.notification('success', res.message, 'Se ha agregado a tus favoritos')
    }, err => {
      this.ns.notification('error', 'Ha ocurrido un error', err.error.message)
    });
  }
}
