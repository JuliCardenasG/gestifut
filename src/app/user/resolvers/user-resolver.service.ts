import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class UserResolverService implements Resolve<any> {

  constructor(private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot): any {
    const userId = route.params.id;
    console.log(userId);
    return this.authService.getUser(userId);
  }

}
