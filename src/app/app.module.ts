import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { UserResolverService } from './user/resolvers/user-resolver.service';
import { TournamentService } from './private/tournament/services/tournament.service';
import { TournamentsResolverService } from './private/tournament/resolvers/tournaments-resolver.service';
import { LoginActivateGuard } from './guards/login-activate.guard';
import { LogoutActivateGuard } from './guards/logout-activate.guard';
import { TeamResolverService } from './private/team/resolvers/team-resolver.service';
import { TeamService } from './private/team/services/team.service';
import { GoogleLoginModule } from './google-login/google-login.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoggedUserResolverService } from './user/resolvers/logged-user-resolver.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    GoogleLoginModule.forRoot('185094683124-f6ro8sdi456p08mo8b0p0cudkc64ah26.apps.googleusercontent.com'),
    RouterModule.forRoot(APP_ROUTES, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  providers: [
    AuthService,
    UserResolverService,
    LoggedUserResolverService,
    TournamentService,
    TournamentsResolverService,
    LoginActivateGuard,
    LogoutActivateGuard,
    TeamService,
    TeamResolverService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
