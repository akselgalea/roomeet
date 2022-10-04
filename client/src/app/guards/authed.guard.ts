import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthedGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  
  canActivate(){
    if(this.userService.isLogged()) {
      console.log('Token no valido o ya expiro');
      this.router.navigate(['/perfil']);
      return false;
    }
    
    return true;
  }
  
}
