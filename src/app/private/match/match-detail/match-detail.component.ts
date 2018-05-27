import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMatch } from '../../tournament/interfaces/i-match';
import { ITeam } from '../../team/interfaces/i-team';
import { TournamentService } from '../../tournament/services/tournament.service';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})
export class MatchDetailComponent implements OnInit {

  match: IMatch;
  teams: ITeam[];
  constructor(private route: ActivatedRoute, private tournamentService: TournamentService,
    private matchService: MatchService, private router: Router) { }

  ngOnInit() {
    this.match = this.route.snapshot.data.match;
    this.tournamentService.getTournamentTeams(this.match.tournament_id).subscribe(
      teams => this.teams = teams
    );
  }

  getTeamName(teamId) {
    // tslint:disable-next-line:triple-equals
    return this.teams.find(team => team.id == teamId).name;
  }

  setMatchResult() {
    const matchResultJson = {
      id:  this.match.id,
      tournamentId: this.match.tournament_id,
      teamLocalId: this.match.team_local_id,
      teamLocalGoals: this.match.team_local_goals,
      teamVisitorId: this.match.team_visitor_id,
      teamVisitorGoals: this.match.team_visitor_goals
    };

    this.matchService.setMatchResult(matchResultJson).subscribe(
      ok => {
        this.router.navigate(['/private/tournaments', this.match.tournament_id]);
      }
    );
  }

}
