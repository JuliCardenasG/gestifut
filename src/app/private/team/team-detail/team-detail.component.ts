import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITeam } from '../interfaces/i-team';
import { SERVER_URL } from '../../../app.constants';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {

  readonly IMG_SERVER = SERVER_URL;
  team: ITeam;
  newPlayer;
  showAddPlayer = false;
  constructor(private route: ActivatedRoute, private teamService: TeamService) { }

  ngOnInit() {
    this.team = this.route.snapshot.data.team;
    this.team.players = this.team.players.sort((a, b) => a.number > b.number);
    this.newPlayer = {
      name: '',
      number: '',
      teamId: this.team.id
    };
  }

  showAddPlayerForm() {
    this.showAddPlayer = !this.showAddPlayer;
  }

  addPlayer() {
    this.teamService.addPlayerToTeam(this.newPlayer).subscribe(
      ok => {
        this.showAddPlayer = false;
        this.team.players.push(this.newPlayer);
        this.newPlayer = {
          name: '',
          number: '',
          teamId: this.team.id
        };
      }
    );
  }

}
