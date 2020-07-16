import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, timer, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/Order';
import { AuthenticationService } from '../authentication/authentication.service';
import { map, mergeMap, switchMap, switchMapTo, tap } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  readonly URL = environment.apiUrl;
  date: Date;

  private newOrdersSubj = new BehaviorSubject<string[]>([]);
  newOrders: Observable<string[]>;

  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.date = new Date();

    this.newOrders = this.newOrdersSubj.asObservable();

    this.auth.currUser
      .pipe(tap(o => console.log('or=>', o)),
        switchMap(currUser => {
          if (!currUser) return of([]);
          return timer(0, 5000).pipe(switchMapTo(this.getNewOrders(currUser.role, currUser._id)))
        }))
      .subscribe(orders => this.newOrdersSubj.next([...orders]));
  }

  clearNewOrdersSubj() {
    this.newOrdersSubj.next([]);
  }

  register(newOrder: Order): Observable<Order> {
    return this.http.post<Order>(`${this.URL}/bookings`, newOrder)
  }

  getBookingsByCurrUser(role: string, user_id: string) {
    if (role == 'admin')
      return this.get()

    let params = {};
    if (role == "member") params = { owner_id: user_id }
    if (role == "user") params = { clientId: user_id }
    return this.getBookings(params)
  }

  getBookings(params: any) {
    return this.http.post<Order[]>(`${this.URL}/bookingsByParams`, params)
  }

  get(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.URL}/bookings`)
  }

  changeOrderStatus(_id: string, status: string) {
    return this.http.patch<Order>(`${this.URL}/bookings/${_id}`, { status: status })
  }

  getNewOrders(role: string, user_id: string): Observable<string[]> {
    let params = { date: this.date };
    if (role == "member") params["owner_id"] = user_id;
    if (role == "user") params["clientId"] = user_id;

    return this.http.post<string[]>(`${this.URL}/bookings_new/`, params);
  }
}