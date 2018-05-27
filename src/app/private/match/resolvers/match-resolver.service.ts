import { Injectable } from '@angular/core';
import { MatchService } from '../services/match.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IMatch } from '../../tournament/interfaces/i-match';

@Injectable()
export class MatchResolverService {

  constructor(private matchService: MatchService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<IMatch> {
    const matchId = route.params.id;
    return this.matchService.getMatch(matchId);
  }

}
