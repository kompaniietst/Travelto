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

  constructor(private http: HttpClient) { }

  register(room: Room): Observable<Room> {
    return this.http.post<Room>(`${this.URL}/rooms`, room)
  }

  get(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.URL}/rooms`)
  }

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
