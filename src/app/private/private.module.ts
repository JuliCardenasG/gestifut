import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { MainComponent } from './main/main.component';
import { UserResolverService } from '../user/resolvers/user-resolver.service';
import { TournamentsResolverService } from './tournament/resolvers/tournaments-resolver.service';
import { TournamentResolverService } from './tournament/resolvers/tournament-resolver.service';
import { PublicModule } from '../public/public.module';
import { RegisterComponent } from '../shared/register/register.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersListComponent } from './users-list/users-list.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    RouterModule.forChild(
      [
        {
          path: '',
          component: LayoutComponent,
          children: [
            {
              path: '',
              component: MainComponent,
              resolve: {
                user: UserResolverService,
                tournaments: TournamentsResolverService
              }
            },
            {
              path: 'profile/:id',
              component: RegisterComponent,
              resolve : {
                user: UserResolverService,
              }
            },
            {
              path: 'users',
              component: UsersListComponent
            },
            {
              path: 'tournaments',
              loadChildren: './tournament/tournament.module#TournamentModule'
            },
            {
              path: 'teams',
              loadChildren: './team/team.module#TeamModule',
            },
            {
              path: 'players',
              loadChildren: './player/player.module#PlayerModule'
            },
            {
              path: 'matches',
              loadChildren: './match/match.module#MatchModule'
            }
          ]
        }
      ]
    )
  ],
  declarations: [LayoutComponent, TopMenuComponent, MainComponent, UsersListComponent],
  providers: [
    TournamentResolverService
  ]
})
export class PrivateModule { }
