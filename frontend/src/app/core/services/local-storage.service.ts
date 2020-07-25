import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storageSubject: BehaviorSubject<any> = new BehaviorSubject({});
  private cityIdSubject: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {
    if (!localStorage.getItem('searchParams')) {
      localStorage.setItem('searchParams', JSON.stringify({}));
      return;
    }

    var localstorageData = JSON.parse(localStorage.getItem('searchParams'))

    if (Object.keys(localstorageData).length > 0)
      this.storageSubject.next(localstorageData);


    if (localstorageData.city)
      this.cityIdSubject = new BehaviorSubject(localstorageData.city._id)
  }

  saveToLocalstorage(obj: any) {
    console.log('obj', obj);

    localStorage.setItem('searchParams', JSON.stringify(obj))
    this.storageSubject.next(obj);

    console.log('obj.city', obj.city);

    if (obj.city) this.cityIdSubject.next(obj.city._id)
  }

  saveDateToLocalstorage(date) {
    // console.log('date',date);

    var localstorageData = JSON.parse(localStorage.getItem('searchParams'));
    localstorageData["date"] = date;
    localStorage.setItem('searchParams', JSON.stringify(localstorageData));
    this.storageSubject.next(localstorageData);
  }

  onCityChange(): Observable<string> {
    if (!this.cityIdSubject)
      return of('');

    return this.cityIdSubject.asObservable();
  }

  getData() {
    return JSON.parse(localStorage.getItem('searchParams'))
  }

  get(): Observable<any> {
    if (!this.storageSubject)
      return of({});

    return this.storageSubject.asObservable();
  }
}
