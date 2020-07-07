import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { User } from 'src/app/core/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  currUser: User;

  constructor(
    private router: Router,
    private auth: AuthenticationService) {
    this.currUser = this.auth.getCurrUser();
  }

  get isAdmin() { return this.currUser.role == 'admin' }
  get isMember() { return this.currUser.role == 'member' }
  get isUser() { return this.currUser.role == 'user' }

  ngOnInit(): void { }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
