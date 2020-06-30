import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/core/models/Order';
import { BookingService } from 'src/app/core/services/booking.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-users-orders',
  templateUrl: './users-orders.component.html',
  styleUrls: ['./users-orders.component.scss']
})
export class UsersOrdersComponent implements OnInit {

  bookings$: Observable<Order[]>;
  showSpinner: boolean = false;

  states = ["confirmCancel", "active", "completed", "canceled"]
  inProcess: boolean = false;

  constructor(
    private booking: BookingService,
    private auth: AuthenticationService
  ) {
    this.bookings$ = this.booking.getBookings();
    this.showSpinner = true;
    this.booking.getBookings().subscribe(x => this.showSpinner = false);
  }

  ngOnInit(): void {
  }

  changeOrderStatus(_id: string, status: string) {
    console.log('in hotel', _id, status);

    this.booking.changeOrderStatus(_id, status)
      .subscribe(x => console.log(x),
        err => console.log(err));
    this.inProcess = true;
  }

  trackById(index, item) {
    return item.id;
  }

}
