import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hotel } from '../models/Hotel';
import { Room } from '../models/Room';
import { Amenity } from '../models/Amenity';

@Injectable({
  providedIn: 'root'
})
export class AmenitiesService {

  readonly URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  get(): Observable<Amenity[]> {
    return this.http.get<Amenity[]>(`${this.URL}/amenities`)
  }
}
