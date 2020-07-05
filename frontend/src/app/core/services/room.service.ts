import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hotel } from '../models/Hotel';
import { Room } from '../models/Room';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  readonly URL = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService) { }

  register(room: Room): Observable<Room> {
    const newRoom = room;
    newRoom["creator"] = this.auth.getCurrUser()._id;

    return this.http.post<Room>(`${this.URL}/rooms`, newRoom)
  }

  get(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.URL}/rooms`)
  }

  getRoomsBy(currUserId: string): Observable<Room[]> {
    // console.log('-', currUserId);
    
    const params = { "creator": currUserId };
    return this.http.post<Room[]>(`${this.URL}/roomsBy`, params)
  }

  // getFull(): Observable<Room[]> {
  //   return this.http.get<Room[]>(`${this.URL}/fullrooms`)
  // }

  getRoomsByHotel(id: string): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.URL}/roomsByHotel/${id}`)
  }

  editRoom(_id: string, room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.URL}/rooms/${_id}`, room)
  }

  getRoomBy(_id: string): Observable<Room> {
    return this.http.get<Room>(`${this.URL}/rooms/${_id}`)
  }
}
