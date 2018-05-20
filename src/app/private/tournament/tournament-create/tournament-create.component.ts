import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../user/interfaces/i-user';
import { AuthService } from '../../../services/auth.service';
import { TournamentService } from '../services/tournament.service';
import { Router } from '@angular/router';
import { ITournament } from '../interfaces/i-tournament';

@Component({
  selector: 'app-tournament-create',
  templateUrl: './tournament-create.component.html',
  styleUrls: ['./tournament-create.component.css']
})
export class TournamentCreateComponent implements OnInit {

  user: IUser;
  name: string;
  newTeam;
  teams;
  teamsNumber: number;
  password: string;
  constructor(private authService: AuthService,
    private tournamentService: TournamentService, private router: Router) { }

  ngOnInit() {
    this.authService.getLoggedUser().subscribe(user => {
      this.user = user;
    });
  }

  teamNumberChange() {
    console.log(this.teamsNumber);
    // this.teams = new Array(this.teamsNumber);
    // console.log(this.teams);
  }

  createTournament() {
    const tournament: ITournament = {
      name: this.name,
      teamsNumber: this.teamsNumber,
      adminId: +this.user.id,
    };

    console.log(tournament);

    this.tournamentService.createTournament(tournament).subscribe(
      ok => {
        if (ok) {
          this.router.navigate(['/tournaments']);
        }
      }
    );
  }

}
