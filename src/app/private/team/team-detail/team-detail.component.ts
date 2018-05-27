import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITeam } from '../interfaces/i-team';
import { SERVER_URL } from '../../../app.constants';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {

  readonly IMG_SERVER = SERVER_URL;
  team: ITeam;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.team = this.route.snapshot.data.team;
  }

}
