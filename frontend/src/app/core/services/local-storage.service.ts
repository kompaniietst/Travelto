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
  private cityIdSubject: BehaviorSubject<string> = new BehaviorSubject();

  constructor() {
    if (!localStorage.getItem('searchParams')) {
      localStorage.setItem('searchParams', JSON.stringify({}));
      this.storageSubject.next({});
      return;
    }

    var lsData = JSON.parse(localStorage.getItem('searchParams'))

    this.storageSubject.next(lsData);

    if (lsData.city)
      this.cityIdSubject.next(lsData.city._id)
  }

  saveToLOcalstorage(obj: any) {
    localStorage.setItem('searchParams', JSON.stringify(obj))
    this.storageSubject.next(obj);

    if (obj.city) this.cityIdSubject.next(obj.city._id)
  }

  saveDateToLocalstorage(date){
    // console.log('date',date);
    
    var lsData = JSON.parse(localStorage.getItem('searchParams'));
    lsData["date"] = date;
    localStorage.setItem('searchParams', JSON.stringify(lsData));
    this.storageSubject.next(lsData);
  }

  onCityChange(): Observable<string> {
    return this.cityIdSubject.asObservable();
  }

  get(): Observable<any> {
    // if (!localStorage.getItem('searchParams'))
    //   return null

    // if (localStorage.getItem('searchParams'))
    //   return JSON.parse(localStorage.getItem('searchParams'))
    return this.storageSubject.asObservable();
  }

}
