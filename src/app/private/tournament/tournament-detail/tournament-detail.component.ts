import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITournament } from '../interfaces/i-tournament';
import { SERVER_URL } from '../../../app.constants';
import { ITeam } from '../../team/interfaces/i-team';
import { TournamentService } from '../services/tournament.service';
import { IMatch } from '../interfaces/i-match';

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.css']
})
export class TournamentDetailComponent implements OnInit {

  tournament: ITournament;
  teams: ITeam[];
  matches: IMatch[];
  showMatches: IMatch[];
  matchdays;
  currentMatchdayId;
  readonly IMG_SERVER = SERVER_URL;
  constructor(private route: ActivatedRoute, private tournamentService: TournamentService,
    private router: Router) { }

  ngOnInit() {
    this.tournament = this.route.snapshot.data.tournament;
    this.matches = this.tournament.matches;
    this.currentMatchdayId = this.tournament.matchdays[0].id;
    this.setCurrentMatchday();
  }

  getTeamName(teamId) {
    // tslint:disable-next-line:triple-equals
    return this.tournament.teams.find(team => team.id == teamId).name;
  }

  deleteTournament() {
    this.tournamentService.deleteTournament(this.tournament.id).subscribe(
      ok => this.router.navigate(['/private'])
    );
  }

  setCurrentMatchday() {
    this.showMatches = this.matches.filter(match => {
      // tslint:disable-next-line:triple-equals
      return match.matchday_id == this.currentMatchdayId;
    });
  }

  goToMatch(matchId) {
    this.router.navigate(['/private/matches', matchId]);
  }

  deleteTeam(teamId) {

  }

}
