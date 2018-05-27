import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LogoutActivateGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLogged()
      .map(ok => {
        if (ok) {
          this.router.navigate(['/private']);
        }
        // Si el usuario está logueado, no se le permite acceder a la página de Login (y viceversa)
        return !ok;
      })
      .catch(err => {
        return Observable.of(true);
      });
  }
}
