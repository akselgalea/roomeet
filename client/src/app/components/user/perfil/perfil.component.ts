import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  preview = '';
  showform = false;

  constructor(private userService: UserService, private route: ActivatedRoute, private http: HttpClient) { }

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

  showImgForm() {this.showform = true;}
  closeImgForm() {this.showform = false;}

  loadImg(event: any) {
    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0])
    reader.onload = (e: any) => {
      this.preview = e.target.result;
    }
  }

  uploadImg(newimg: NgForm) {
    console.log(newimg.form.controls);
  }

  addToFav(id: any) {
    console.log('perfil');
    this.userService.createFavorito(id).subscribe(params => {
      console.log(params);
    });
  }
}
