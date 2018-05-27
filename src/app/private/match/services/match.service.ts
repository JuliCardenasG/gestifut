import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMatch } from '../../tournament/interfaces/i-match';
import { Observable } from 'rxjs/Observable';
import { SERVER_URL } from '../../../app.constants';

@Injectable()
export class MatchService {
  readonly MATCH_URL = SERVER_URL + 'matches/';

  constructor(private http: HttpClient) { }

  getMatch(matchId): Observable<IMatch> {
    return this.http.get(this.MATCH_URL + matchId)
      .map((resp: any) => {
        if (resp.ok) {
          return resp.match;
        }
      });
  }

}
