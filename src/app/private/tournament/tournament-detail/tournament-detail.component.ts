import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  readonly IMG_SERVER = SERVER_URL;
  constructor(private route: ActivatedRoute, private tournamentService: TournamentService) { }

  ngOnInit() {
    this.tournament = this.route.snapshot.data.tournament;
    this.tournamentService.getTournamentMatches(this.tournament.id).subscribe(matches => {
      this.matches = matches;
      console.log(matches);
    });
  }

  getTeamName(teamId) {
    console.log(this.tournament.teams);
    // tslint:disable-next-line:triple-equals
    return this.tournament.teams.find(team => team.id == teamId).name;
  }

}
