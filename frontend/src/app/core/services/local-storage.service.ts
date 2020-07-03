import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hotel } from '../models/Hotel';
import { Room } from '../models/Room';
import { Amenity } from '../models/Amenity';
import { City } from '../models/City';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storageSubject: BehaviorSubject<any>;
  private cityIdSubject: BehaviorSubject<string>;

  constructor() {
    if (!localStorage.getItem('searchParams')) {
      localStorage.setItem('searchParams', JSON.stringify({}));
      this.storageSubject = new BehaviorSubject({});
      return;
    }

    var lsData = JSON.parse(localStorage.getItem('searchParams'))
    if (Object.keys(lsData).length > 0)
      this.storageSubject.next(lsData);


    if (lsData.city)
      this.cityIdSubject = new BehaviorSubject(lsData.city._id)
  }

  saveToLOcalstorage(obj: any) {
    localStorage.setItem('searchParams', JSON.stringify(obj))
    this.storageSubject.next(obj);

    if (obj.city) this.cityIdSubject.next(obj.city._id)
  }

  saveDateToLocalstorage(date) {
    // console.log('date',date);

    var lsData = JSON.parse(localStorage.getItem('searchParams'));
    lsData["date"] = date;
    localStorage.setItem('searchParams', JSON.stringify(lsData));
    this.storageSubject.next(lsData);
  }

  onCityChange(): Observable<string> {
    if (!this.cityIdSubject)
      return of('');

    return this.cityIdSubject.asObservable();
  }

  get(): Observable<any> {
    // if (!localStorage.getItem('searchParams'))
    //   return null

    // if (localStorage.getItem('searchParams'))
    //   return JSON.parse(localStorage.getItem('searchParams'))
    console.log('VSLUE ', this.storageSubject);

    if (!this.storageSubject)
      return of({});

    return this.storageSubject.asObservable();
  }

}
