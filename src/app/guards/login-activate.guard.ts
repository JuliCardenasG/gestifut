import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoginActivateGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLogged().map(
      ok => {
        if (ok) {
          return true;
        }
        else {
          this.router.navigate(['/auth/login']);
        }
      }
    )
      .catch(err => {
        this.router.navigate(['/auth/login']);
        return Observable.of(false);
      });
  }
}
