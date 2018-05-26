import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ITournament } from '../interfaces/i-tournament';
import { IServerResponse, ITournamentResponse } from '../../../interfaces/i-server-response';
import { SERVER_URL } from '../../../app.constants';
import * as robin from 'roundrobin';
import { ITeam } from '../../team/interfaces/i-team';
import { IMatch } from '../interfaces/i-match';

@Injectable()
export class TournamentService {

  readonly TOURNAMENT_URL = SERVER_URL + 'tournaments/';
  readonly TEAM_URL = SERVER_URL + 'teams/';
  readonly CALENDAR_URL = SERVER_URL + 'calendars/';
  readonly MATCH_URL = SERVER_URL + 'matches/';

  constructor(private http: HttpClient) { }

  getTournament(id): Observable<ITournament> {
    console.log(id);
    console.log(this.TOURNAMENT_URL + id);
    return this.http.get(this.TOURNAMENT_URL + id)
      .map((response: ITournamentResponse) => {
        console.log(response.tournament);
        return response.tournament;
      })
      .catch(err => Observable.throw(err));
  }

  createTournament(tournament): Observable<any> {
    return this.http.post(this.TOURNAMENT_URL, tournament)
      .map((response: IServerResponse) => {
        console.log(response);
        if (response.ok) {
          return response;
        }
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

  createCalendar(tournamentId): Observable<number> {
    const calendarJson = {
      tournamentId: tournamentId
    };

    return this.http.post(this.CALENDAR_URL, calendarJson)
      .map((response: any) => {
        if (response.ok) {
          return response.calendarId;
        }
      });
  }

  createMatches(matchdaysObject): Observable<boolean> {
    return this.http.post(this.MATCH_URL, matchdaysObject).map((response: any) => {
      if (response.ok) {
        return true;
      }
      return false;
    });
  }

  getTournamentTeams(tournamentId): Observable<ITeam[]> {
    return this.http.get(this.TEAM_URL + 'tournaments/' + tournamentId)
      .map((resp: any) => {
        if (resp.ok) {
          return resp.teams;
        }
      });
  }

  getTournamentMatches(tournamentId): Observable<IMatch[]> {
    return this.http.get(this.MATCH_URL + 'tournaments/' + tournamentId)
      .map((resp: any) => {
        if (resp.ok) {
          return resp.matches;
        }
      });
  }
}
