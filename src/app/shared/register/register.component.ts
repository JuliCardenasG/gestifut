import { Component, OnInit } from '@angular/core';
import { IUser } from '../../user/interfaces/i-user';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { SERVER_URL } from '../../app.constants';

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
  newUser: any;
  errorMsg: string;
  userToEdit: IUser;
  imageToEdit: string;
  imageInput;
  readonly IMG_URL = SERVER_URL;
  constructor(private authService: AuthService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.userToEdit = this.route.snapshot.data.user;
    console.log(this.userToEdit);
    if (this.userToEdit) {
      this.name = this.userToEdit.name;
      this.email = this.userToEdit.email;
      this.imageToEdit = this.userToEdit.image;
    }
  }

  register() {
    if (this.userToEdit) {
      this.newUser = {
        id: this.userToEdit.id,
        name: this.name,
        role: this.userToEdit.role,
        image: this.userToEdit.image
      };

      if (this.image) {
        this.newUser.image = this.image;
      }

      if (this.email !== this.userToEdit.email) {
        this.newUser.email = this.email;
      }

      if (this.password) {
        this.newUser.password = this.password;
      }

      this.authService.editProfile(this.newUser).subscribe(
        ok => this.router.navigate(['/private'])
      );
    } else {
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
            this.router.navigate(['/private']);
          }
        },
        error => {
          this.errorMsg = error;
        }
      );
    }
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

  showError(error) {
    console.error(error);
  }

}
