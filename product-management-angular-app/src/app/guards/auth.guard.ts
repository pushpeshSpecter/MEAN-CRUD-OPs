
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

  constructor(private authService: AuthService, private router: Router) { }
  canActivate() {
    // console.log(this.authService.loggedIn());
    if (this.authService.loggedIn() || localStorage.getItem('user') || localStorage.getItem('username')) {
      console.log('IF canActivate');
      return true;
    }
    console.log('canActivate');
    this.router.navigate['/login'];
    return false;
  }

}
