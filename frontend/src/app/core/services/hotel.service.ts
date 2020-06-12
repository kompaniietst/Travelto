import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hotel } from '../models/Hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  readonly URL = environment.apiUrl;
  private hotelSubject: BehaviorSubject<any>;
  // private bookingSubject: BehaviorSubject<any>;
  // bookings: Observable<any>;

  // get bookingsValue() {
  // }

  constructor(private http: HttpClient) {
    // this.hotelSubject = new BehaviorSubject(JSON.parse(localStorage.getItem("hotels")));
  }

  register(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(`${this.URL}/hotels`, hotel)
  }

  get(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.URL}/hotels`)
  }

  getHotelBy(hotel_id: string): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.URL}/hotels/${hotel_id}`)
  }
}
