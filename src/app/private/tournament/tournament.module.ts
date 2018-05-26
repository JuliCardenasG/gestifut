import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { TournamentCreateComponent } from './tournament-create/tournament-create.component';
import { FormsModule } from '@angular/forms';
import { TournamentDetailComponent } from './tournament-detail/tournament-detail.component';
import { TournamentResolverService } from './resolvers/tournament-resolver.service';

const routes: Route[] = [
  {
    path: 'create',
    component: TournamentCreateComponent
  },
  {
    path: ':id',
    component: TournamentDetailComponent,
    resolve: {
      tournament: TournamentResolverService
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TournamentCreateComponent, TournamentDetailComponent],
  providers: []
})
export class TournamentModule { }
