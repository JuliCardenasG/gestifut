import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { RouterModule, Route } from '@angular/router';
import { MatchService } from './services/match.service';
import { MatchResolverService } from './resolvers/match-resolver.service';
import { FormsModule } from '@angular/forms';

const routes: Route[] = [
  {
    path: ':id',
    component: MatchDetailComponent,
    resolve: {
      match: MatchResolverService,
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [MatchDetailComponent],
  providers: [
    MatchService,
    MatchResolverService
  ]
})
export class MatchModule { }
