import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  public user  = null

  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router) {
    this.user = localStorage.getItem('aspirante');
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.user) {

        return this.router.navigate(['/inicio']).then(() => false);
      }
    return true;
  }

  /* USAR ESTE CODIGO SI SE VA A IMPLEMENTAR JWT */
  /* canActivate() {
    const token = localStorage.getItem("access_token");
    console.log('token expiró?: ' + this.jwtHelper.isTokenExpired(token));
    if (token && !this.jwtHelper.isTokenExpired(token)){
      console.log(this.jwtHelper.decodeToken(token));
      return true;
    }
    localStorage.clear();
    this.router.navigate(["sesion-aspirante"]);
    return false;
  } */

}
