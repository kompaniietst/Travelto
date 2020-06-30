import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/core/models/Order';
import { BookingService } from 'src/app/core/services/booking.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-member-orders',
  templateUrl: './member-orders.component.html',
  styleUrls: ['./member-orders.component.scss']
})
export class MemberOrdersComponent implements OnInit {

  bookings$: Observable<Order[]>;
  actionControl = new FormControl('active');

  constructor(
    private booking: BookingService,
  ) {
  }

  ngOnInit(): void {
    this.bookings$ = this.booking.getBookings();
    this.booking.getBookings().subscribe(x => console.log('orders', x));
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
