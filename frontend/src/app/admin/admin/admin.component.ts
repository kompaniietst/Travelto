import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  userIsAdmin: boolean = false;
  currUser: User;

  constructor(private auth: AuthenticationService) {
    this.currUser = this.auth.getCurrUser();

    this.userIsAdmin = this.auth.isAuthorized() && this.currUser.role == 'admin';
  }

  ngOnInit(): void { }

}
