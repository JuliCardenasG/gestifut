import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { TournamentService } from '../services/tournament.service';
import { ITournament } from '../interfaces/i-tournament';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TournamentsResolverService implements Resolve<ITournament[]> {

  constructor(private tournamentService: TournamentService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<ITournament[]> {
    return this.tournamentService.getTournamentsByUser();
  }

}
