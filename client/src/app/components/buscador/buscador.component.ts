import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private userService: UserService, private ns: NotificationsService, private router: Router) { }

  ngOnInit(): void {
    this.api_url = this.userService.SV_URL;

    this.userService.getBuscadorConfig().subscribe(
      (res: any) => {
        if(!res) this.router.navigate(['/preferencias/buscador']);
        else {
          this.userService.getUsers(res).subscribe(
            (res: any) => {
              this.users = res;
            },
            err => {
              this.ns.notification('error', 'Ha ocurrido un error', 'Operacion fallida')
            }
          );
        }
      },
      err => { console.log(err); }
    );
  }

  addToFav(id: any) {
    this.userService.createFavorito(id).subscribe((res: any) => {
      this.users = this.users.filter((item: any) => item.id !== id);
      this.ns.notification('success', res.message, 'Se ha agregado a tus favoritos');
    }, err => {
      this.ns.notification('error', 'Ha ocurrido un error', err.error.message)
    });
  }
}
