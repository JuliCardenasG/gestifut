import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../user/interfaces/i-user';
import { AuthService } from '../../../services/auth.service';
import { TournamentService } from '../services/tournament.service';
import { Router } from '@angular/router';
import { ITeam } from '../../team/interfaces/i-team';
import { ITournament } from '../interfaces/i-tournament';

@Component({
  selector: 'app-tournament-create',
  templateUrl: './tournament-create.component.html',
  styleUrls: ['./tournament-create.component.css']
})
export class TournamentCreateComponent implements OnInit {

  user: IUser;
  name: string;
  newTeam: ITeam;
  teams = [];
  teamsNumber: number;
  image: string;
  description: string;
  isPublic = false;
  errorMsg;
  constructor(private authService: AuthService,
    private tournamentService: TournamentService, private router: Router) { }

  ngOnInit() {
    this.authService.getLoggedUser().subscribe(user => {
      this.user = user;
    });

    this.newTeam = {
      name: '',
      tournament_id: 0
    };
  }

  createTournament() {
    const tournament: ITournament = {
      name: this.name,
      teamsNumber: this.teams.length,
      adminId: +this.user.id,
      description: this.description,
      image: this.image,
      teams: this.teams,
      is_public: this.isPublic
    };

    this.tournamentService.createTournament(tournament).subscribe(
      tournamentResponse => {
        const tournamentId = tournamentResponse.id;
        const teamsIds = tournamentResponse.teamsIds.sort((a, b) => a > b);
        for (let i = 0; i < this.teams.length; i++) {
          this.teams[i].id = teamsIds[i];
        }
        if (tournamentId) {
          this.tournamentService.createCalendar(tournamentId).subscribe(
            calendarId => {
              const matchdayObject = {
                calendarId: calendarId,
                tournamentId: tournamentId,
                teams: this.teams
              };
              this.tournamentService.createMatches(matchdayObject).subscribe(
                ok => {
                  this.router.navigate(['/private/tournaments/', tournamentId]);
                }
              );
            }
          );
        }
      }
    );
  }

  addTeam() {
    this.teams.push(this.newTeam);
    this.newTeam = {
      name: '',
      tournament_id: 0,
    };
  }

  deleteTeam(index) {
    this.teams.splice(index, 1);
  }

  imageChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  teamImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newTeam.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

}
