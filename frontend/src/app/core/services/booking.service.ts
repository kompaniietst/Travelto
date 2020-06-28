import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hotel } from '../models/Hotel';
import { Room } from '../models/Room';
import { Amenity } from '../models/Amenity';
import { City } from '../models/City';
import { Order } from '../models/Order';
import { AuthenticationService } from '../authentication/authentication.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  readonly URL = environment.apiUrl;
  currUserId: string;

  private bookingsSubject: BehaviorSubject<any> = new BehaviorSubject();
  bookings: Order[] = [];

  constructor(private http: HttpClient,
    private auth: AuthenticationService) {

    this.get().subscribe((o: Order[]) => {
      console.log('OO', o);

      this.bookingsSubject.next(o);
      this.bookings = o;
    })

    this.currUserId = this.auth.getCurrUser()._id;

  }

  register(newOrder: Order): Observable<Order> {
    console.log('newOrder', newOrder);
    return this.http.post<Order>(`${this.URL}/bookings`, newOrder)
  }

  getBookings() {
    return this.bookingsSubject.asObservable();
    // return of([1,2,4])
  }

  get(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.URL}/bookings`)
  }

  getOrdersByUserId(): Observable<Order[]> {
    // const params = { clientId: this.currUserId }
    return this.http.get<Order[]>(`${this.URL}/bookingsByUser/${this.currUserId}`)
    // return this.http.post<Order[]>(`${this.URL}/bookingsByUser`, { params: params })
  }

  changeOrderStatus(_id: string, status: string, order: Order) {
    return this.http.patch<Order>(`${this.URL}/bookings/${_id}`, { status: status })
      .pipe(map(o_ => {
        this.bookings.find(b => b._id == _id).status = status;
        this.bookingsSubject.next(this.bookings);
      }))
  }

  countOrders() {
    // ???????
    // var length = 0;
    // this.http.get<Order[]>(`${this.URL}/bookings`).subscribe(res => length = res.length);
    // return length;
  }
}

