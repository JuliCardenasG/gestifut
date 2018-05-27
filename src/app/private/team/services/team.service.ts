import { Injectable } from '@angular/core';
import { ITeam } from '../interfaces/i-team';
import { Observable } from 'rxjs/Observable';
import { SERVER_URL } from '../../../app.constants';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TeamService {
  readonly TEAM_URL = SERVER_URL + 'teams/';

  constructor(private http: HttpClient) { }

  getTeam(teamId): Observable<ITeam> {
    return this.http.get(this.TEAM_URL + teamId)
      .map((response: any) => {
        if (response.ok) {
          return response.team;
        }
      });
  }
}
