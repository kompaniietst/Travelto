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
  countBookings: number;
  newBookingsAmount: number;
  showSpinner = false;
  user_id: string;
  role: string;
  newOrdersId: string[] = [];

  private bookingsSubject: BehaviorSubject<any> = new BehaviorSubject([]);
  bookings: Order[] = [];

  constructor(
    private service: BookingService,
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
          this.getBookings(this.role, user._id)
        }
      });

    this.service.countOrders
      .subscribe(x => {
        if (x.length > 0) {
          this.newBookingsAmount = x.length;
          this.getBookings(this.role, this.user_id);
          this.newOrdersId = x;
        }
      });
  }

  getBookings(role: string, user_id: string) {
    this.service.getBookingsByCurrRole(role, user_id)
      .subscribe(
        (orders: Order[]) => {
          console.log('orders$', orders);

          this.bookings = orders;
          this.bookingsSubject.next([...this.bookings]);

          this.showSpinner = false;
          this.countBookings = orders.length
        },
        err => console.log(err))
  }

  ngOnInit(): void { }

  changeOrderStatus(_id: string, status: string) {
    this.service.changeOrderStatus(_id, status)
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