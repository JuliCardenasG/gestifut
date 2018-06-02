import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { SERVER_URL } from '../app.constants';
import { Router } from '@angular/router';
import { IUser } from '../user/interfaces/i-user';
import { IServerResponse } from '../interfaces/i-server-response';

@Injectable()
export class AuthService {

  loggedUser: IUser;

  constructor(private http: HttpClient, private router: Router) { }

  login(login): Observable<boolean> {
    return this.http.post(SERVER_URL + 'auth/login', login)
      .map((response: IServerResponse) => {
        if (response.ok) {
          localStorage.setItem('token', response.token);
          return true;
        }
        return false;
      })
      .catch(resp => Observable.throw('Error con el login'));
  }

  getLoggedUser(): Observable<IUser> {
    return this.http.get(SERVER_URL + 'auth/user')
      .map((response: IServerResponse) => {
        if (response.ok) {
          this.loggedUser = response.user;
          return response.user;
        }
      })
      .catch(err => Observable.throw(err));
  }

  isLogged(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      return Observable.of(false);
    }
    return this.http.get(SERVER_URL + 'auth/token')
      .map((response: IServerResponse) => {
        return response.ok;
      })
      .catch(err => Observable.throw(err));
  }

  register(registerJson): Observable<IUser> {
    return this.http.post(SERVER_URL + 'auth/register', registerJson)
      .map((response: IServerResponse) => {
        if (response.ok) {
          localStorage.setItem('token', response.token);
          this.getLoggedUser().subscribe();
          return response.ok;
        }
      })
      .catch(err => {
        if (err.status === 0) {
          return Observable.throw('No hay conexión a la red. Inténtalo de nuevo más tarde');
        }
        if (err.status === 400) {
          return Observable.throw('Email duplicado. Prueba a iniciar sesión');
        }
        return Observable.throw('Error al hacer login. Inténtalo de nuevo más tarde');
      });
  }

  googleAccess(token: string): Observable<boolean> {
    localStorage.setItem('token', token);
    console.log(token);
    return this.http.get(SERVER_URL + 'auth/google')
      .catch((resp: HttpErrorResponse) => Observable.throw('Error entering with Google'))
      .map((resp: any) => {
        if (resp.ok) {
          localStorage.setItem('token', resp.token);
          return true;
        } else {
          throw resp.errorMessage;
        }
      });
  }

  editProfile (user: IUser): Observable<boolean> {
    return this.http.put(SERVER_URL + 'auth/edit/' + user.id, user)
      .map((resp: any) => {
        return resp.ok;
      });
  }

  deleteProfile(userId): Observable<boolean> {
    return this.http.delete(SERVER_URL + 'auth/delete/' + userId)
      .map((resp: any) => {
        return resp.ok;
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedUser = null;
    this.router.navigate(['/']);
  }
}
