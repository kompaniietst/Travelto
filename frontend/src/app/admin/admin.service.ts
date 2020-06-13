import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { HotelService } from '../core/services/hotel.service';
import { environment } from 'src/environments/environment';
import { Amenity } from '../core/models/Amenity';
import { Hotel } from '../core/models/Hotel';
import { City } from '../core/models/City';
import { delay } from 'rxjs/operators';
import { Room } from '../core/models/Room';
import { RoomService } from '../core/services/room.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  readonly URL = environment.apiUrl;
  // private amenitiesSubject: BehaviorSubject<any>;
  // amenities: Observable<any>;

  constructor(
    private http: HttpClient,
    private hotelService: HotelService,
    private roomService: RoomService,
  ) {

    // this.amenitiesSubject = new BehaviorSubject(this.getAmenities());
    // this.amenities = this.amenitiesSubject.asObservable();

  }

  registerHotel(hotel: Hotel): Observable<Hotel> {
    return this.hotelService.register(hotel)
      .pipe(delay(1500))
  }

  getHotels(): Observable<Hotel[]> {
    return this.hotelService.get();
  }

  getHotelBy(_id: string): Observable<Hotel> {
    return this.hotelService.getHotelBy(_id);
  }

  editHotel(_id: string, hotel: Hotel): Observable<Hotel> {  
    console.log('in serv',_id, hotel);
    return this.hotelService.editHotel(_id, hotel);
  }

  registerAmenity(amenity: Amenity): Observable<Amenity> {
    return this.http
      .post<Amenity>(`${this.URL}/amenities`, amenity)
      .pipe(delay(1500))
  }

  getAmenities(): Observable<Amenity[]> {
    return this.http
      .get<Amenity[]>(`${this.URL}/amenities`)
  }



  registerCity(city: City): Observable<City> {
    return this.http
      .post<City>(`${this.URL}/cities`, city)
      .pipe(delay(1500))
  }

  getCities(): Observable<City[]> {
    return this.http
      .get<City[]>(`${this.URL}/cities`)
  }



  registerRoom(room: Room): Observable<Room> {
    console.log('RRR', room);

    return this.roomService.register(room)
      .pipe(delay(1500))
  }

  getRooms(): Observable<Room[]> {
    return this.roomService.get()
      .pipe(delay(1500))
  }

  getRoomsByHotel(id: string): Observable<Room[]> {
    return this.roomService.getRoomsByHotel(id);
  }


  uploadImages(route, imageData) {
    return this.http.post(`${this.URL}/images/${route}`, imageData)
      .pipe(delay(1500))
  }
}
