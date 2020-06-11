import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hotel } from '../models/Hotel';
import { Room } from '../models/Room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  readonly URL = environment.apiUrl;
  // private hotelSubject: BehaviorSubject<any>;
  // private bookingSubject: BehaviorSubject<any>;
  // bookings: Observable<any>;

  // get bookingsValue() {
  // }

  constructor(private http: HttpClient) {
    // this.hotelSubject = new BehaviorSubject(JSON.parse(localStorage.getItem("hotels")));
  }

  register(room: Room): Observable<Room> {
    return this.http.post<Room>(`${this.URL}/rooms`, room)
  }

  get(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.URL}/rooms`)
  }
}
