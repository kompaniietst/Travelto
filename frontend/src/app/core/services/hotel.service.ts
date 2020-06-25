import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hotel } from '../models/Hotel';
import { AuthenticationService } from '../authentication/authentication.service';

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

  constructor(private http: HttpClient,
    private auth: AuthenticationService) {
    // this.hotelSubject = new BehaviorSubject(JSON.parse(localStorage.getItem("hotels")));
  }

  register(hotel: Hotel): Observable<Hotel> {
    const newHotel = hotel;
    newHotel["creator"] = this.auth.getCurrUser()._id;

    return this.http.post<Hotel>(`${this.URL}/hotels`, newHotel)
  }

  get(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.URL}/hotels`)
  }

  getHotelsBy(currUserId: string): Observable<Hotel[]> {
    const params = { "creator": currUserId };
    return this.http.post<Hotel[]>(`${this.URL}/hotelsBy`, params)
  }

  getHotelBy(_id: string): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.URL}/hotels/${_id}`)
  }

  editHotel(_id: string, hotel: Hotel): Observable<Hotel> {
    return this.http.put<Hotel>(`${this.URL}/hotels/${_id}`, hotel)
  }

  // gethotelInfoByRoom(_id: string): Observable<Hotel> {
  //   // console.log('id', _id);

  //   return this.http.get<Hotel>(`${this.URL}/hotelInfoByRoom/${_id}`)
  // }
}
