import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hotel } from '../models/Hotel';
import { Room } from '../models/Room';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class RoomService {


  readonly URL = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService) { }

  register(room: Room, user_id: string): Observable<Room> {
    const newRoom = room;
    newRoom["creator"] = user_id;

    console.log('ner', newRoom);

    return this.http.post<Room>(`${this.URL}/rooms`, newRoom)
  }

  getRoomsByCurrRole(role: string, user_id: string) {
    return role == 'admin' ? this.get() : this.getRoomsByOwner(user_id)
  }

  get(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.URL}/rooms`)
  }

  getRoomsByOwner(_id: string): Observable<Room[]> {
    // console.log('-', currUserId);

    const params = { "creator": _id };
    return this.http.post<Room[]>(`${this.URL}/roomsByOwner`, params)
  }

  // getRoomByOwner(_id: string, room_id: string): Observable<Room> {
  //   console.log('creator: ', _id, 'room_id: ', room_id);

  //   const params = { room_id: room_id, "creator": _id };
  //   return this.http.post<Room>(`${this.URL}/roomByOwner`, params)
  // }

  // getFull(): Observable<Room[]> {
  //   return this.http.get<Room[]>(`${this.URL}/fullrooms`)
  // }

  getRoomsByHotel(id: string): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.URL}/roomsByHotel/${id}`)
  }

  editRoom(_id: string, room: Room): Observable<Room> {
    console.log('=====', _id, room);

    return this.http.patch<Room>(`${this.URL}/rooms/${_id}`, room)
  }

  getRoomBy(room_id: string): Observable<Room> {
    return this.http.get<Room>(`${this.URL}/rooms/${room_id}`)
  }

  removeRoom(_id: string) {
    console.log('id', _id);

    return this.http.delete<Room>(`${this.URL}/rooms/${_id}`)
  }
}
