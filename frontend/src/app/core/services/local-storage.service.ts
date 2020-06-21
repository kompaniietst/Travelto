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
export class LocalStorageService {

  private storageSubject: BehaviorSubject<any> = new BehaviorSubject();

  constructor() {
    if (!localStorage.getItem('searchParams')) {
      localStorage.setItem('searchParams', JSON.stringify({}));
      this.storageSubject.next({});
      return;
    }

    this.storageSubject.next(JSON.parse(localStorage.getItem('searchParams')));
  }

  set(obj: any) {
    localStorage.setItem('searchParams', JSON.stringify(obj))
    this.storageSubject.next(obj);
  }

  get(): Observable<any> {
    // if (!localStorage.getItem('searchParams'))
    //   return null

    // if (localStorage.getItem('searchParams'))
    //   return JSON.parse(localStorage.getItem('searchParams'))
    return this.storageSubject.asObservable();
  }
}
