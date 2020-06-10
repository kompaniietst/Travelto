import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currUser: User;

  notification: number = 0;

  constructor(
    private router: Router,
    private auth: AuthenticationService,
  ) {
    auth.currUser.subscribe((user: User) => this.currUser = user)
  }

  ngOnInit(): void { }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
