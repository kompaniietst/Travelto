import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/core/services/booking.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Order } from 'src/app/core/models/Order';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  readonly URL = environment.apiUrl;
  
  bookings$: Observable<Order[]>;
  actionControl = new FormControl('active');
  countBookings: number;
  showSpinner = false;
  role: string;

  constructor(
    private booking: BookingService,
    private auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.auth.currUser
      .subscribe(user => {
        console.log('user=', user);
        this.role = user.role;
        this.getBookings(user._id)
      })

    /*     let url = this.router.url.split('/');
    
        this.currUserId = url[url.length - 2]
    
        this.role = this.auth.getCurrUser().role;
    
        if (this.currUserId) {
          this.showSpinner = true;
    
          // this.role == 'member'
          //   ? this.getBookings(this.currUserId, this.role)
          //   : this.getBookings(this.currUserId, this.role)
        } */
  }


  getBookings(userId: string) {


    if (this.role == "admin") {
      this.bookings$ = this.booking.get();
      this.booking.get()
        .subscribe(x => {
          this.showSpinner = false;
          console.log('orders component', x);
          this.countBookings = x.length
        });
      return;
    }

    let params = {};

    if (this.role == "member")
      params = { owner_id: userId }

    if (this.role == "user")
      params = { clientId: userId }


    this.bookings$ = this.booking.getBookings(params);
    this.booking.getBookings(params)
      .subscribe(x => {
        this.showSpinner = false;
        console.log('orders component', x);
        this.countBookings = x.length
      });

  }


  ngOnInit(): void {
    // this.bookings$ = this.booking.getBookings();
    // this.booking.getBookings().subscribe(x => console.log('orders component', x));
    // console.log('OBSS', this.booking.getBookings());

  }

  changeOrderStatus(_id: string, status: string) {
    // switch (status) {
    //   case 'active':
    this.booking.changeOrderStatus(_id, status)
      .subscribe(
        x => console.log('changeOrderStatus', x),
        err => console.log(err)
      )
    //     break;

    //   default:
    //     break;
    // }
  }

  // cancel(_id: string) {
  //   this.booking.cancelBooking(_id);
  //   this.inProcess = true;
  // }

  trackById(index, item) {
    return item.id;
  }
}
