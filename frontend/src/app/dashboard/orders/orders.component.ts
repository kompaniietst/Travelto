import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/core/services/booking.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { Order } from 'src/app/core/models/Order';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

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
  user_id: string;
  role: string;

  private bookingsSubject: BehaviorSubject<any> = new BehaviorSubject([]);
  bookings: Order[] = [];

  constructor(
    private bookingService: BookingService,
    private auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.bookings$ = this.bookingsSubject.asObservable();

    this.auth.currUser
      .subscribe(user => {
        if (user) {
          this.user_id = user._id;
          this.role = user.role;
          this.getBookings(user._id)
        }
      })

    this.bookingService.countOrders
      .subscribe(x => {
        if (x.length > 0)
          this.getBookings(this.user_id)
      })
  }

  getBookings(user_id: string) {

    if (this.role == "admin") {
      this.bookingService.get()
        .subscribe((orders: Order[]) => {

          this.bookings = orders;
          this.bookingsSubject.next([...this.bookings]);

          this.showSpinner = false;
          this.countBookings = orders.length
          return orders;
        })

      return;
    }

    let params = {};

    if (this.role == "member")
      params = { owner_id: user_id }

    if (this.role == "user")
      params = { clientId: user_id }

    this.bookingService.getBookings(params)
      .pipe(
        map((orders: Order[]) => {
          this.bookings = orders;
          this.bookingsSubject.next([...this.bookings]);

          this.showSpinner = false;
          this.countBookings = orders.length
          return orders;
        }))
      .subscribe(x => x);
  }

  ngOnInit(): void { }

  changeOrderStatus(_id: string, status: string) {
    this.bookingService.changeOrderStatus(_id, status)
      .subscribe(
        (resp: Order) => {
          let i = this.bookings.findIndex((o: Order) => o._id == resp._id);
          this.bookings[i].status = resp.status;
          this.bookings[i]["completed"] = resp.completed;
          this.bookingsSubject.next([...this.bookings]);
        },
        err => console.log(err)
      )
  }

  trackById(index, item) {
    return item.id;
  }
}
