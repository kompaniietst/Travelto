import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // private amenitiesSubject: BehaviorSubject<any>;
  // amenities: Observable<any>;

  constructor(
    private http: HttpClient,
    ) {
      
      // this.amenitiesSubject = new BehaviorSubject(this.getAmenities());
      // this.amenities = this.amenitiesSubject.asObservable();

  }

  registerAmenity(data) {
    return this.http.post('http://localhost:4000/amenities/register', data)
  }

  getAmenities() {
    return this.http.get('http://localhost:4000/amenities');
  }
}
