import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { TournamentCreateComponent } from './tournament-create/tournament-create.component';
import { FormsModule } from '@angular/forms';

const routes: Route[] = [
  {
    path: 'create',
    component: TournamentCreateComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TournamentCreateComponent],
  providers: []
})
export class TournamentModule { }
