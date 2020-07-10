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

  private newOrdersSubj = new BehaviorSubject<Order[]>([]);
  newOrders: Order[] = [];
  countOrders: Observable<Order[]>;

  constructor(private http: HttpClient) {
    this.date = new Date();

    this.countOrders = this.newOrdersSubj.asObservable();

    setInterval(() => {
      console.log('req');
      // this.count++;
      this.getNewOrders()
        .subscribe(
          x => {
            this.newOrdersSubj.next(x);
            // this.count = x.length;
            console.log('D -- ', x)
          },
          err => console.log(err)
        )
    }, 5000);
  }

  register(newOrder: Order): Observable<Order> {
    return this.http.post<Order>(`${this.URL}/bookings`, newOrder)
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

  getNewOrders(): Observable<Order[]> {
    return this.http.post<Order[]>(`${this.URL}/bookings_new/`, { date: this.date });
  }
}