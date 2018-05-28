import { Component, OnInit } from '@angular/core';
import { IUser } from '../../user/interfaces/i-user';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string;
  email: string;
  password: string;
  image: string;
  newUser: IUser;
  errorMsg: string;
  imageInput;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

  }

  register() {
    this.newUser = {
      name: this.name,
      email: this.email,
      password: this.password,
      image: this.image,
      role: 'user'
    };
    this.authService.register(this.newUser).subscribe(
      ok => {
        if (ok) {
          this.router.navigate(['/auth/registered']);
        }
      },
      error => {
        this.errorMsg = error;
      }
    );
  }

  imageChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
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

}
