import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private toast: NgToastService) { }

  notification(type: string, title: string, message: string) {
    switch(type) {
      case 'warning':
        this.toast.warning({detail: title, summary: message, position: 'tr', duration: 3000});
        break;
      
      case 'success':
        this.toast.success({detail: title, summary: message, position: 'tr', duration: 3000});
        break;

      case 'error':
        this.toast.error({detail: title, summary: message, position: 'tr', duration: 3000});
        break;
      
      case 'info':
        this.toast.info({detail: title, summary: message, position: 'tr', duration: 3000});
        break;
    }
  }
}
