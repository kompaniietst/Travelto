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
    private auth: AuthenticationService
  ) {
    this.bookings$ = this.booking.get();
    this.booking.get().subscribe(x => console.log('b', x));

  }

  ngOnInit(): void {
  }

  trackById(index, item) {
    return item.id;
  }
}
