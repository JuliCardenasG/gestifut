import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { MainComponent } from './main/main.component';
import { UserResolverService } from '../user/resolvers/user-resolver.service';
import { TournamentsResolverService } from './tournament/resolvers/tournaments-resolver.service';
import { TournamentResolverService } from './tournament/resolvers/tournament-resolver.service';

@NgModule({
  imports: [
    CommonModule,
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
            }
          ]
        }
      ]
    )
  ],
  declarations: [LayoutComponent, TopMenuComponent, MainComponent],
  providers: [
    TournamentResolverService
  ]
})
export class PrivateModule { }
