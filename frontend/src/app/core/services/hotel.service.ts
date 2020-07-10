import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hotel } from '../models/Hotel';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  readonly URL = environment.apiUrl;
  // private hotelSubject: BehaviorSubject<any>;
  // currUser: User;
  // private bookingSubject: BehaviorSubject<any>;
  // bookings: Observable<any>;

  // get bookingsValue() {
  // }

  constructor(private http: HttpClient,
    private auth: AuthenticationService) {
    // this.currUser = this.auth.getCurrUser();
    // this.hotelSubject = new BehaviorSubject(JSON.parse(localStorage.getItem("hotels")));
  }

  register(hotel: Hotel): Observable<Hotel> {
    const newHotel = hotel;
    newHotel["creator"] = this.auth.getCurrUser()._id;

    console.log('newh', newHotel, `${this.URL}/hotels`);

    return this.http.post<Hotel>(`${this.URL}/hotels`, newHotel)
  }

  getHotelsByCurrRole(role: string, user_id: string) {
    return role == 'admin' ? this.get() : this.getHotelsBy(user_id)
  }

  get(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.URL}/hotels`)
  }

  getHotelsBy(user_id: string): Observable<Hotel[]> {
    const params = { "creator": user_id };
    return this.http.post<Hotel[]>(`${this.URL}/hotelsBy`, params)
  }

  getHotelBy(hotel_id: string): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.URL}/hotels/${hotel_id}`)
  }

  editHotel(_id: string, hotel: Hotel): Observable<Hotel> {
    return this.http.put<Hotel>(`${this.URL}/hotels/${_id}`, hotel)
  }

  removeHotel(_id: string) {
    console.log('id', _id);

    return this.http.delete<Hotel>(`${this.URL}/hotels/${_id}`)
  }
}
