import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../user/interfaces/i-user';
import { ActivatedRoute } from '@angular/router';
import { SERVER_URL } from '../../app.constants';
import { ITournament } from '../tournament/interfaces/i-tournament';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  user: IUser;
  readonly IMG_SERVER = SERVER_URL;
  tournaments: ITournament[];

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = this.route.snapshot.data.user;
    this.tournaments = this.route.snapshot.data.tournaments;
  }

}
