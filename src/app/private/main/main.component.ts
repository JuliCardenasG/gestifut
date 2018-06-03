import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../user/interfaces/i-user';
import { ActivatedRoute, Router } from '@angular/router';
import { SERVER_URL } from '../../app.constants';
import { ITournament } from '../tournament/interfaces/i-tournament';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from '../../shared/modals/delete-modal/delete-modal.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  user: IUser;
  readonly IMG_SERVER = SERVER_URL;
  tournaments: ITournament[];

  constructor(private authService: AuthService, private route: ActivatedRoute,
    private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.user = this.route.snapshot.data.user;
    this.tournaments = this.route.snapshot.data.tournaments;
  }

  goToProfileEdit() {
    this.router.navigate(['/private/profile/', this.user.id]);
  }

  deleteProfile () {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.result.then(result => {
      if (result) {
        this.authService.deleteProfile(this.user.id).subscribe(
          ok => {
            if (ok) {
              this.authService.logout();
              this.router.navigate(['/']);
            }
          }
        );
      }
    });
  }

}
