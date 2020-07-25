import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterItem } from '../models/FilterItem';

@Injectable({
  providedIn: 'root'
})
export class FilterTabsService {

  private tabsSubject: BehaviorSubject<any[]>;
  private removedTabID: BehaviorSubject<string>;
  public tabs = [];

  private priceRangeSubject: BehaviorSubject<number[]>;

  constructor() {
    this.tabsSubject = new BehaviorSubject(null);
    this.removedTabID = new BehaviorSubject("");
    this.priceRangeSubject = new BehaviorSubject([50, 250]);
  }

  setFilter(obj: FilterItem) {
    console.log('tab', obj);

    this.tabs.push(obj);
    this.tabsSubject.next(this.tabs);
  }

  setPriceFilter(arr: any) {
    this.priceRangeSubject.next(arr);
  }

  getPriceFilter(): Observable<number[]> {
    return this.priceRangeSubject.asObservable()
  }

  getFilters(): Observable<FilterItem[]> {
    return this.tabsSubject.asObservable()
  }

  remove(_id: string) {
    this.removedTabID.next(_id); // set id of removed element

    var i = this.tabs.findIndex(t => t._id == _id);
    this.tabs.splice(i, 1)

    this.tabsSubject.next(this.tabs);
  }

  getRemovedTabID(): Observable<string> {
    return this.removedTabID.asObservable()
  }
}
