import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../services/tournament.service';
import { ITournament } from '../interfaces/i-tournament';
import { SERVER_URL } from '../../../app.constants';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css']
})
export class TournamentListComponent implements OnInit {

  readonly IMG_SERVER = SERVER_URL;
  tournaments: ITournament[];
  constructor(private tournamentService: TournamentService) { }

  ngOnInit() {
    this.tournamentService.getTournamentsByUser().subscribe(
      tournaments => this.tournaments = tournaments
    );
  }
}
