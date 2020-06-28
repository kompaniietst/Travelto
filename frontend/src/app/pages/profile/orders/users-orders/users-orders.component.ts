import { Component, OnInit } from '@angular/core';
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

  constructor(
    private booking: BookingService,
    private auth: AuthenticationService
  ) {
    this.bookings$ = this.booking.getOrdersByUserId();
    this.booking.getOrdersByUserId().subscribe(x => console.log('b', x));
  }

  ngOnInit(): void {
  }
  
  // arrayFrom(number: number) {
  //   return Array.from(Array(number))
  // }
  
  trackById(index, item) {
    return item.id;
  }

  // cancel(_id: string) { }
}
