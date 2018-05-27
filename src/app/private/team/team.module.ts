import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { TeamResolverService } from './resolvers/team-resolver.service';

const routes: Route[] = [
  {
    path: ':id',
    component: TeamDetailComponent,
    resolve: {
      team: TeamResolverService
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TeamDetailComponent]
})
export class TeamModule { }
