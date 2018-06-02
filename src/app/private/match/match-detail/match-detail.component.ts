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
  localTeam: ITeam;
  visitorTeam: ITeam;
  saved = false;
  constructor(private route: ActivatedRoute, private tournamentService: TournamentService,
    private matchService: MatchService, private router: Router) { }

  ngOnInit() {
    this.match = this.route.snapshot.data.match;
    console.log(this.match);
    this.tournamentService.getTournamentTeams(this.match.tournament_id).subscribe(
      teams => {
        this.teams = teams;
        // tslint:disable-next-line:triple-equals
        this.localTeam = this.teams.find(team => team.id == this.match.team_local_id);
        // tslint:disable-next-line:triple-equals
        this.visitorTeam = this.teams.find(team => team.id == this.match.team_visitor_id);
        console.log(this.teams);
      }
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
        const localScorers = this.localTeam.players.filter(player => player.goals > 0);
        const visitorScorers = this.visitorTeam.players.filter(player => player.goals > 0);
        let scorers = [...localScorers, ...visitorScorers];
        scorers = scorers.map(scorer => {
          return {
            match_id: this.match.id,
            team_id: scorer.team_id,
            player_id: scorer.id,
            goals: scorer.goals
          };
        });
        this.matchService.setScorers(scorers).subscribe(
          okScorers => {
            this.saved = true;
          }
        );
      }
    );
  }

}
