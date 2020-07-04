import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storageSubject: BehaviorSubject<any> = new BehaviorSubject({});
  private cityIdSubject: BehaviorSubject<string>;

  constructor() {
    if (!localStorage.getItem('searchParams')) {
      localStorage.setItem('searchParams', JSON.stringify({}));
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
    if (!this.storageSubject)
      return of({});

    return this.storageSubject.asObservable();
  }

}
