import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../user/interfaces/i-user';
import { ActivatedRoute } from '@angular/router';
import { SERVER_URL } from '../../app.constants';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  user: IUser;
  readonly IMG_SERVER = SERVER_URL;
  tournaments = [
    {
      name: 'Tournament1',
      description: 'Tournament1'
    },
    {
      name: 'Tournament1',
      description: 'Tournament1'
    },
    {
      name: 'Tournament1',
      description: 'Tournament1'
    },
    {
      name: 'Tournament1',
      description: 'Tournament1'
    }
  ];

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = this.route.snapshot.data.user;
    console.log(this.user);
    this.tournaments = this.route.snapshot.data.tournaments;
  }

}
