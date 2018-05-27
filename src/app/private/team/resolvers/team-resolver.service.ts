import { Injectable } from '@angular/core';
import { TeamService } from '../services/team.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ITeam } from '../interfaces/i-team';

@Injectable()
export class TeamResolverService {

  constructor(private teamService: TeamService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<ITeam> {
    const tournamentId = route.params.id;
    return this.teamService.getTeam(tournamentId);
  }

}
