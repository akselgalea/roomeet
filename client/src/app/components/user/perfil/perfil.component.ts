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
  owner : boolean = false;
  error : string = "";
  showImg : boolean = false;
  img : Foto = {};

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if(params.has("id")) {
        this.userService.getUser(params.get("id") as string).subscribe(res => {
          this.user = res;
        },
        err => {
          this.error = err.error.text
        })
      } else {
        this.userService.getPerfil().subscribe(res => {
          this.user = res;
          this.owner = true;
        },
        err => {
          this.error = err.error.text
        })
      }
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
