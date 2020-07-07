import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/Order';
import { AuthenticationService } from '../authentication/authentication.service';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  readonly URL = environment.apiUrl;
  currUserId: string;

  private bookingsSubject: BehaviorSubject<any> = new BehaviorSubject([]);
  bookings: Order[] = [];

  constructor(private http: HttpClient,
    private auth: AuthenticationService) {




    if (this.auth.isAuthorized()) {
      this.currUserId = this.auth.getCurrUser()._id;

      this.auth.currUser
        .pipe(
          mergeMap((user) => this.getOrdersByUserId(user._id))
        )

        // .subscribe(x => console.log('update curr user',x))

        // this.getOrdersByUserId(this.currUserId)
        .subscribe((o: Order[]) => {
          console.log(' ');
          console.log(' ');
          console.log('BOOKINGS serv', o);
          console.log('id: ', this.currUserId);
          console.log(' ');
          console.log(' ');
          console.log(' ');


          this.bookings = o;
          this.bookingsSubject.next([...this.bookings]);
        })

    }







  }

  register(newOrder: Order): Observable<Order> {
    console.log('newOrder', newOrder);
    return this.http.post<Order>(`${this.URL}/bookings`, newOrder)
      .pipe(map(o => {
        console.log('http', o);

        this.bookings.push(newOrder);
        this.bookingsSubject.next([...this.bookings]);
        return o;
      }))
  }

  getBookings(params: any) {
    return this.http.post<Order[]>(`${this.URL}/bookingsByParams`, params)
  }
  // getBookings(userId: string) {

  //   return this.getOrdersByUserId(userId);
  // }
  // getBookings() {
  //   console.log('bookingsSubject value', this.bookingsSubject.value);

  //   return this.bookingsSubject.asObservable();
  // }

  /*                  http               */

  get(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.URL}/bookings`)
  }

  getOrdersByUserId(currUserId: string): Observable<Order[]> {
    // const params = { clientId: this.currUserId }
    console.log(' ');

    console.log('getOrdersByUserId', currUserId);

    return this.http.get<Order[]>(`${this.URL}/bookingsByUser/${currUserId}`)
    // return this.http.post<Order[]>(`${this.URL}/bookingsByUser`, { params: params })
  }

  changeOrderStatus(_id: string, status: string) {
    console.log('st', _id, status);

    return this.http.patch<Order>(`${this.URL}/bookings/${_id}`, { status: status })
      .pipe(map(o => {
        console.log('o=>', o);

        this.bookings.find(b => b._id == _id).status = status;
        this.bookingsSubject.next([...this.bookings]);
      },
        err => console.log('err', err)))
  }

  countOrders() {
    // ???????
    // var length = 0;
    // this.http.get<Order[]>(`${this.URL}/bookings`).subscribe(res => length = res.length);
    // return length;
  }
}

