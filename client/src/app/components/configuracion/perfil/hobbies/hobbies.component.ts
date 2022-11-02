import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrls: ['./hobbies.component.scss']
})
export class HobbiesComponent implements OnInit {
  hobbies: any = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getHobbies().subscribe((res: any) => {
      this.hobbies = res;
      console.log(this.hobbies);
    }, err => {
      console.log(err);
    })
  }

}
