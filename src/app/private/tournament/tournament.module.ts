import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { TournamentCreateComponent } from './tournament-create/tournament-create.component';
import { FormsModule } from '@angular/forms';
import { TournamentDetailComponent } from './tournament-detail/tournament-detail.component';
import { TournamentResolverService } from './resolvers/tournament-resolver.service';
import { TournamentListComponent } from './tournament-list/tournament-list.component';

const routes: Route[] = [
  {
    path: 'create',
    component: TournamentCreateComponent
  },
  {
    path: 'edit/:id',
    component: TournamentCreateComponent,
    resolve: {
      tournament: TournamentResolverService
    }
  },
  {
    path: ':id',
    component: TournamentDetailComponent,
    resolve: {
      tournament: TournamentResolverService
    }
  },
  {
    path: '',
    component: TournamentListComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TournamentCreateComponent, TournamentDetailComponent, TournamentListComponent],
  providers: []
})
export class TournamentModule { }
