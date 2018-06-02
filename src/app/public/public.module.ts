import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { UserModule } from '../user/user.module';
import { LogoutActivateGuard } from '../guards/logout-activate.guard';
import { GoogleLoginDirective } from '../google-login/directives/google-login.directive';
import { GoogleLoginModule } from '../google-login/google-login.module';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from '../shared/register/register.component';

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
    SharedModule,
    GoogleLoginModule,
    RouterModule.forChild(routes),
    UserModule
  ],
  declarations: [
    LayoutComponent,
    LoginComponent,
    MainComponent
  ]
})
export class PublicModule { }
