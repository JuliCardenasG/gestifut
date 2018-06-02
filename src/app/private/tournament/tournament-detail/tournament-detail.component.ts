import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITournament } from '../interfaces/i-tournament';
import { SERVER_URL } from '../../../app.constants';
import { ITeam } from '../../team/interfaces/i-team';
import { TournamentService } from '../services/tournament.service';
import { IMatch } from '../interfaces/i-match';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from '../../../shared/modals/delete-modal/delete-modal.component';

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
  clasifications;
  readonly IMG_SERVER = SERVER_URL;
  constructor(private route: ActivatedRoute, private tournamentService: TournamentService,
    private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.tournament = this.route.snapshot.data.tournament;
    this.matches = this.tournament.matches;
    this.currentMatchdayId = this.tournament.matchdays[0].id;
    this.tournamentService.getTournamentClasification(this.tournament.id).subscribe(
      clasifications => {
        this.clasifications = clasifications.sort((a, b) => {

          // tslint:disable-next-line:triple-equals
          if (a.points == b.points && (a.goals_scored >= a.goals_against && b.goals_scored >= b.goals_against)) {
            return a.goals_scored < b.goals_scored;
          }
          // tslint:disable-next-line:one-line
          else {
            return a.points < b.points;
          }
        });
      }
    );
    this.setCurrentMatchday();
  }

  getTeamName(teamId) {
    // tslint:disable-next-line:triple-equals
    return this.tournament.teams.find(team => team.id == teamId).name;
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

  goToTournamentEdit() {
    this.router.navigate(['/tournament/edit']);
  }

  deleteTournament() {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.result.then(result => {
      console.log(result);
      if (result) {
        this.tournamentService.deleteTournament(this.tournament.id).subscribe(
          ok => {
            if (ok) {
              this.router.navigate(['/private']);
            }
          }
        );
      }
    });
  }

  deleteTeam(teamId) {

  }
}
