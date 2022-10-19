import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Foto, User } from 'src/app/models/User';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  user: User = {};
  owner: boolean = false;
  favorito: boolean = false;
  error: string = "";
  showImg: boolean = false;
  img: Foto = {};
  upload: any;
  preview = '';
  api_url = '';
  showform = false;

  constructor(private userService: UserService, private route: ActivatedRoute, private ns: NotificationsService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.api_url = this.userService.SV_URL;
    this.route.paramMap.subscribe(params => {
      if(params.has("id")) {
        this.userService.getUser(params.get("id") as string).subscribe(res => {
          this.user = res;
          this.isFavorite(this.user.id);
        },
        err => {
          this.error = err.error.message;
          this.ns.notification('error', 'Ha ocurrido un error', err.error.message);
        })
      } else {
        this.userService.getPerfil().subscribe(res => {
          this.user = res;
          this.owner = true;
        },
        err => {
          this.error = err.error.message;
          this.ns.notification('error', 'Ha ocurrido un error', err.error.message);
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

  showImgForm() {this.showform = true;}
  closeImgForm() {this.showform = false;}

  loadImg(event: any) {
    const reader = new FileReader();
    this.upload = event.target.files[0];
    reader.readAsDataURL(event.target.files[0])
    reader.onload = (e: any) => {
      this.preview = e.target.result;
    }
  }

  uploadImg(newimg: NgForm) {
    const data = new FormData();
    data.append("file", this.upload);
    data.append("descripcion", newimg.controls["descripcion"].value);

    this.userService.uploadImg(data).subscribe((res: any) => {
      this.showform = false;
      this.ns.notification('success', res.message, 'Se ha agregado una imagen a tu perfil');
      this.ngOnInit();
    }, err => {
      this.ns.notification('error', 'Ha ocurrido un error', err.error.message);
    })
  }

  addToFav(id: any) {
    this.userService.createFavorito(id).subscribe((res: any) => {
      this.ns.notification('success', res.message, 'Se ha agregado a tus favoritos')
      this.favorito = true;
    }, err => {
      this.ns.notification('error', 'Ha ocurrido un error', err.error.message)
    });
  }
  
  delFav(id: any) {
    this.userService.deleteFavorito(id).subscribe((res: any) => {
      this.ns.notification('success', 'Operacion realizada con exito', res.message);
      this.favorito = false;
    }, err => {
      this.ns.notification('error', err.error.message, 'Ha ocurrido un error');
    })
  }
  
  isFavorite(id: any) {
    this.userService.isFavorito(id).subscribe((res: any) => {
      this.favorito = res.result;
    }, err => {
      console.log(err);
    })
  }

  editPerfil() {this.router.navigate(['preferencias/perfil'])}
}
