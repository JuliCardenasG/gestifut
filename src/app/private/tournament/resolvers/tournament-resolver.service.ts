import { Injectable } from '@angular/core';
import { TournamentService } from '../services/tournament.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ITournament } from '../interfaces/i-tournament';

@Injectable()
export class TournamentResolverService {

  constructor(private tournamentService: TournamentService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<ITournament> {
    const tournamentId = route.params.id;
    return this.tournamentService.getTournament(tournamentId);
  }

}
