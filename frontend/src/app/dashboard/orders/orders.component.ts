import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/core/services/booking.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject, forkJoin, combineLatest } from 'rxjs';
import { Order } from 'src/app/core/models/Order';
import { Router, ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { User } from 'src/app/core/models/User';

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
      .subscribe((user: User) => this.role = user.role)

    this.auth.currUser
      .pipe(
        mergeMap((user: User) =>
          this.service.getBookingsByCurrUser(user.role, user._id)))
      .subscribe(
        (orders: Order[]) => {
          console.log('orders$', orders);

          this.bookings = orders;
          this.bookingsSubject.next([...this.bookings]);

          this.showSpinner = false;
          this.countBookings = orders.filter(o => o.status == "active").length
        },
        err => console.log(err))


        
    combineLatest(
      this.service.newOrders,
      this.auth.currUser
        .pipe(
          mergeMap((user: User) =>
            this.service.getBookingsByCurrUser(user.role, user._id)))
    )
      .subscribe(x => {
        let newOrders = x[0] as string[];
        let orders = x[1] as Order[];

        if (newOrders.length > 0) {
          // console.log('new orders ', newOrders);
          this.newBookingsAmount = x.length;
          this.newOrdersId = newOrders;

          // console.log('orders$', orders);
          this.bookings = orders;
          this.bookingsSubject.next([...this.bookings]);

          this.showSpinner = false;
          this.countBookings = orders.filter(o => o.status == "active").length;
        }
      })

    
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