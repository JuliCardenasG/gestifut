import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

@Injectable()
export class LoggedUserResolverService implements Resolve<any> {

  constructor(private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot): any {
    return this.authService.getLoggedUser();
  }
}
