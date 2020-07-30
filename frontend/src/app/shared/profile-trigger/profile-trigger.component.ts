import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/core/authentication/login/login.component';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { User } from 'src/app/core/models/User';
import { environment } from 'src/environments/environment';
import { BookingService } from 'src/app/core/services/booking.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ViewportSizeDetector } from '../../core/extends/ViewportSizeDetector';

@Component({
  selector: 'app-profile-trigger',
  templateUrl: './profile-trigger.component.html',
  styleUrls: ['./profile-trigger.component.scss']
})
export class ProfileTriggerComponent extends ViewportSizeDetector implements OnInit {

  readonly URL = environment.apiUrl;

  currUser: User;
  profileImage: string;
  count = 0;

  @HostListener('window:resize', ['$event'])
  onResize = () => this.defineScreenSize();

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private bookingService: BookingService,
    private auth: AuthenticationService,
    breakpointObserver: BreakpointObserver
  ) {
    super(breakpointObserver);
    this.defineScreenSize()

    this.bookingService.newOrders
      .subscribe((x: string[]) => {
        this.count = x.length;
        if (this.router.url.includes('orders')) {
          this.bookingService.clearNewOrdersSubj();
        }
      });

    this.auth.currUser.subscribe((user: User) => {
      this.currUser = user;

      this.currUser?.image
        ? this.profileImage = this.URL + this.currUser.image
        : this.profileImage = '';
    })

  }

  get isAdmin() { return this.currUser.role == 'admin' }
  get isMember() { return this.currUser.role == 'member' }
  get isUser() { return this.currUser.role == 'user' }

  ngOnInit() { }

  openDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      panelClass: 'popup',
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
