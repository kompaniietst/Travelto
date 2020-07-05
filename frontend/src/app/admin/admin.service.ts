import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { HotelService } from '../core/services/hotel.service';
import { environment } from 'src/environments/environment';
import { Amenity } from '../core/models/Amenity';
import { Hotel } from '../core/models/Hotel';
import { City } from '../core/models/City';
import { delay, map } from 'rxjs/operators';
import { Room } from '../core/models/Room';
import { RoomService } from '../core/services/room.service';
import { AuthenticationService } from '../core/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  readonly URL = environment.apiUrl;
  currUserId: string;

  private hotelsSubject: BehaviorSubject<Hotel[]> = new BehaviorSubject([]);
  hotels: Hotel[] = [];
  allHotels: Observable<Hotel[]>;

  private roomsSubject: BehaviorSubject<Room[]> = new BehaviorSubject([]);
  rooms: Room[] = [];
  allRooms: Observable<Room[]>;

  constructor(
    private http: HttpClient,
    private hotelService: HotelService,
    private roomService: RoomService,
    private auth: AuthenticationService
  ) {

    this.currUserId = this.auth.getCurrUser()._id;

    this.getHotelsBy(this.currUserId).
      subscribe((x: Hotel[]) => {
        console.log('get hotels', x);

        this.hotels = x;
        this.hotelsSubject.next([...x]);
      });

    this.allHotels = this.hotelsSubject.asObservable();

    this.getRoomsBy(this.currUserId).
      subscribe((x: Room[]) => {
        console.log('adm serv', x);

        this.rooms = x;
        this.roomsSubject.next([...x]);
      });

    this.allHotels = this.hotelsSubject.asObservable();
    this.allRooms = this.roomsSubject.asObservable();
  }

  registerHotel(hotel: Hotel): Observable<Hotel> {
    return this.hotelService.register(hotel)
      .pipe(
        map((x: Hotel) => {
          console.log('reg ', x);

          this.hotels.push(x);
          this.hotelsSubject.next([...this.hotels]);
          return x;
        }),
        delay(1500)
      )
  }

  getHotelsBy(currUserId: string): Observable<Hotel[]> {
    return this.hotelService.getHotelsBy(currUserId as string);
  }

  getHotelBy(_id: string): Observable<Hotel> {
    return this.hotelService.getHotelBy(_id);
  }

  editHotel(_id: string, hotel: Hotel): Observable<Hotel> {
    // console.log('in serv', _id, hotel);
    return this.hotelService.editHotel(_id, hotel)
      .pipe(delay(1500))
  }

  removeHotel(_id: string) {
    return this.hotelService.removeHotel(_id)
      .pipe(
        map((x) => {
          console.log('rem in adm', x);
          console.log('   ', this.hotels);


          let i = this.hotels.findIndex((h: Hotel) => h._id == _id);
          console.log('i', i);

          this.hotels.splice(i, 1);
          this.hotelsSubject.next([...this.hotels]);

          console.log('   ', this.hotels);
          return x;
        }),
        delay(1500)
      )
  }

  // gethotelInfoByRoom(_id: string): Observable<Hotel> {
  //   console.log('id', _id);

  //   return this.hotelService.gethotelInfoByRoom(_id);
  // }

  //--------------------------------------------------------

  registerAmenity(amenity: Amenity): Observable<Amenity> {
    return this.http
      .post<Amenity>(`${this.URL}/amenities`, amenity)
      .pipe(delay(1500))
  }

  getAmenities(): Observable<Amenity[]> {
    return this.http
      .get<Amenity[]>(`${this.URL}/amenities`)
  }

  editAmenity(_id: string, amenity: Amenity): Observable<Amenity> {
    return this.http.put<Amenity>(`${this.URL}/amenities/${_id}`, amenity)
  }

  //--------------------------------------------------------

  registerCity(city: City): Observable<City> {
    return this.http
      .post<City>(`${this.URL}/cities`, city)
      .pipe(delay(1500))
  }

  getCities(): Observable<City[]> {
    return this.http
      .get<City[]>(`${this.URL}/cities`)
  }

  //--------------------------------------------------------

  registerRoom(room: Room): Observable<Room> {
    return this.roomService.register(room)
      .pipe(
        map((x: Room) => {
          console.log('reg ', x);

          this.rooms.push(x);
          this.roomsSubject.next([...this.rooms]);
          return x;
        }),
        delay(1500)
      )
  }


  editRoom(_id: string, room: Room): Observable<Room> {
    return this.roomService.editRoom(_id, room)
      .pipe(delay(1500))
  }

  getRooms(): Observable<Room[]> {
    return this.roomService.get()
      .pipe(delay(1500))
  }

  getRoomsBy(currUserId: string): Observable<Room[]> {
    // console.log(currUserId);

    return this.roomService.getRoomsBy(currUserId as string)
      .pipe(delay(1500))
  }

  getRoomBy(_id: string): Observable<Room> {
    return this.roomService.getRoomBy(_id);
  }

  getRoomsByHotel(id: string): Observable<Room[]> {
    return this.roomService.getRoomsByHotel(id);
  }

  //--------------------------------------------------------

  uploadImages(path: string, imageData) {
    return this.http.post(`${this.URL}/images/${path}`, imageData)
      .pipe(delay(1500))
  }
}
