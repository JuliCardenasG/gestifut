import { Component, OnInit } from '@angular/core';
import { IUser } from '../../user/interfaces/i-user';
import { AuthService } from '../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from '../../shared/modals/delete-modal/delete-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: IUser[];
  constructor(private authService: AuthService, private modalService: NgbModal,
    private router: Router) { }

  ngOnInit() {
    this.authService.getUsers().subscribe(
      users => this.users = users
    );
  }

  deleteProfile (userId) {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.result.then(result => {
      if (result) {
        this.authService.deleteProfile(userId).subscribe(
          ok => {
            if (ok) {
              this.router.navigate(['/private/users']);
            }
          }
        );
      }
    });
  }

}
