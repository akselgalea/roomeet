import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {
  users: User[] = [];
  api_url = '';
  constructor(private userService: UserService, private ns: NotificationsService, private router: Router) { }

  ngOnInit(): void {
    this.api_url = this.userService.SV_URL;

    this.userService.getBuscadorConfig().subscribe(
      (res: any) => {
        if(res.length === 0) this.router.navigate(['/preferencias/buscador']);
        else {
          this.userService.getUsers().subscribe(
            res => {
              this.users = (res as User[]);
            },
            err => {
              console.log(err.error.message);
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
      this.ns.notification('success', res.message, 'Se ha agregado a tus favoritos');
      this.ngOnInit();
    }, err => {
      this.ns.notification('error', 'Ha ocurrido un error', err.error.message)
    });
  }
}
