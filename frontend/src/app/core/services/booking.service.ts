import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hotel } from '../models/Hotel';
import { Room } from '../models/Room';
import { Amenity } from '../models/Amenity';
import { City } from '../models/City';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  readonly URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  register(newOrder: Order): Observable<Order> {
    console.log('newOrder', newOrder);
    return this.http.post<Order>(`${this.URL}/bookings`, newOrder)
  }

  get(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.URL}/bookings`)
  }

  countOrders() {
    // ???????
    // var length = 0;
    // this.http.get<Order[]>(`${this.URL}/bookings`).subscribe(res => length = res.length);
    // return length;
  }
}

