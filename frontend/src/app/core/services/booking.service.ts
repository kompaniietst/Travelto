import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  readonly URL = environment.apiUrl;
  date: Date;

  private newOrdersSubj = new BehaviorSubject<string[]>([]);
  countOrders: Observable<string[]>;

  constructor(private http: HttpClient) {
    this.date = new Date();

    this.countOrders = this.newOrdersSubj.asObservable();

    setInterval(() => {
      this.getNewOrders()
        .subscribe(
          (x: string[]) => {
            console.log('new orders -- ', x)
            this.newOrdersSubj.next([...x]);
          },
          err => console.log(err)
        )
    }, 5000);
  }

  clearNewOrdersSubj() {
    this.newOrdersSubj.next([]);
  }

  register(newOrder: Order): Observable<Order> {
    return this.http.post<Order>(`${this.URL}/bookings`, newOrder)
  }

  getBookingsByCurrRole(role: string, user_id: string) {
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

  getNewOrders(): Observable<string[]> {
    return this.http.post<string[]>(`${this.URL}/bookings_new/`, { date: this.date });
  }
}