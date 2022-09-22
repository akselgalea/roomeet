import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Foto, User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  user : User = {};
  showImg : boolean = false;
  img : Foto = {};

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userService.getUser(params.get("id") as string).subscribe(res => {
        this.user = res;
      });
    });
  }

  zoomIn(foto : Foto) {
    this.img = foto;
    this.showImg = true;

  }

  zoomOut() {
    this.showImg = false;
    this.img = {};
  }
}
