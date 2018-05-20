import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ITournament } from '../interfaces/i-tournament';
import { IServerResponse, ITournamentResponse } from '../../../interfaces/i-server-response';
import { SERVER_URL } from '../../../app.constants';

@Injectable()
export class TournamentService {

  readonly TOURNAMENT_URL = SERVER_URL + 'tournaments/';
  constructor(private http: HttpClient) { }

  getTournament(id): Observable<ITournament> {
    return this.http.get(this.TOURNAMENT_URL + id)
      .map((response: ITournamentResponse) => {
        return response.tournament;
      })
      .catch(err => Observable.throw(err));
  }

  createTournament(tournament): Observable<boolean> {
    return this.http.post(this.TOURNAMENT_URL, tournament)
      .map((response: IServerResponse) => {
        return response.ok;
      })
      .catch(err => Observable.throw(err));
  }

  getTournamentsByUser(): Observable<ITournament[]> {
    return this.http.get(this.TOURNAMENT_URL + 'user')
      .map((response: ITournamentResponse) => {
        return response.tournaments;
      })
      .catch(err => Observable.throw(err));
  }
}
