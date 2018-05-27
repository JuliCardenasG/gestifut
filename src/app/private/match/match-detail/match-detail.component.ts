import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMatch } from '../../tournament/interfaces/i-match';
import { ITeam } from '../../team/interfaces/i-team';
import { TournamentService } from '../../tournament/services/tournament.service';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})
export class MatchDetailComponent implements OnInit {

  match: IMatch;
  teams: ITeam[];
  constructor(private route: ActivatedRoute, private tournamentService: TournamentService) { }

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

}
