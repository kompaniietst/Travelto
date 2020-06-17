import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hotel } from '../models/Hotel';
import { Room } from '../models/Room';
import { Amenity } from '../models/Amenity';
import { City } from '../models/City';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  readonly URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  get(): Observable<City[]> {
    return this.http.get<City[]>(`${this.URL}/cities`)
  }
}
