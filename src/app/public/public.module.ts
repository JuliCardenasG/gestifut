import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { UserModule } from '../user/user.module';
import { LogoutActivateGuard } from '../guards/logout-activate.guard';
import { GoogleLoginDirective } from '../google-login/directives/google-login.directive';
import { GoogleLoginModule } from '../google-login/google-login.module';

const routes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: MainComponent
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [LogoutActivateGuard]
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [LogoutActivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GoogleLoginModule,
    RouterModule.forChild(routes),
    UserModule
  ],
  declarations: [
    LayoutComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent
  ]
})
export class PublicModule { }
