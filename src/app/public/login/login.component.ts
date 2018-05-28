import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginObj = {
    email: '',
    password: ''
  };
  error: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.loginObj).subscribe(
      ok => {
        if (ok) {
          this.authService.getLoggedUser();
          this.router.navigate(['/private']);
        }
      },
      error => this.error = error
    );
  }

  loggedGoogle (user: gapi.auth2.GoogleUser) {
    const token = user.getAuthResponse(true).access_token;
    this.authService.googleAccess(token)
      .subscribe(
        ok => {
          this.router.navigate(['/private']);
        });
  }

  showError(error){
    console.error(error);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

}
