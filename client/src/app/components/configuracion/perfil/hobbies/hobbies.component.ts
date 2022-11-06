import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrls: ['./hobbies.component.scss']
})
export class HobbiesComponent implements OnInit {
  myhobbies: any = [];
  categorias: any = [];
  categoria: any = null;

  constructor(private userService: UserService, private ns: NotificationsService) { }

  ngOnInit(): void {
    this.getCategorias();
    this.getMyHobbies();
  }

  getCategorias() {
    this.userService.getHobbies().subscribe((res: any) => {
      this.categorias = res;
      this.categoria = res[0];
    }, err => {
      console.log(err);
    })
  }

  getMyHobbies() {
    this.userService.getMyHobbies().subscribe((res: any) => {
      this.myhobbies = res;
    }, err => {
      console.log(err);
    })
  }

  addHobbie(form: NgForm) {
    this.userService.addHobbie(form.controls['hobbie'].value).subscribe((res: any) => {
      this.ns.notification('success', 'Operacion realizada con exito', 'Hobbie agregado exitosamente');
      this.getMyHobbies();
      form.reset();
    }, err => {
      console.log(err);
      this.ns.notification('error', 'Ha ocurrido un error', err.error.message);
    })
  }

  createHobbie(form: NgForm) {
    let data = {
      hobbie: form.controls['hobbie'].value,
      categoria_id: form.controls['category'].value
    }

    this.userService.createHobbie(data).subscribe((res: any) => {
      this.ns.notification('success', 'Operacion realizada con exito', 'Hobbie creado exitosamente');
    }, err => {
      this.ns.notification('error', 'Ha ocurrido un error', err.error.message);
    })
    form.reset();
  }

  setCategoria(id: any, hobbie: NgModel) {
    if(!hobbie.pristine) hobbie.reset();
    this.categoria = this.categorias.find((item: any) => id == item.id);
  }

  removeHobbie(id: string) {
    this.userService.removeHobbie(id).subscribe((res: any) => {
      this.myhobbies = this.myhobbies.filter((item: any) => item.id !== id);
      this.ns.notification('success', 'Operacion realizada con exito', 'Hobbie removido satisfactoriamente');
    }, err => {
      console.log(err);
    })
  }
}
