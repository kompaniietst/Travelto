import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/core/authentication/login/login.component';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-profile-trigger',
  templateUrl: './profile-trigger.component.html',
  styleUrls: ['./profile-trigger.component.scss']
})
export class ProfileTriggerComponent implements OnInit {

  currUser: User;
  notification: number = 0;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private auth: AuthenticationService,
    // private bookingService: BookingService
  ) {

    this.auth.currUser.subscribe((user: User) => {
      this.currUser = user
    })

    // this.bookingService.bookings.subscribe(x =>
    //   this.notification = x.filter(f => f.state == 'active').length
    // );
  }

  ngOnInit() {
  }


  openDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      panelClass: 'popup',
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
