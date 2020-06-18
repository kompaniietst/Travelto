import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterTabsService {

  private tabsSubject: BehaviorSubject<any[]>;
  private removedTabID: BehaviorSubject<string>;
  public tabs = [];

  constructor() {
    this.tabsSubject = new BehaviorSubject();
    this.removedTabID = new BehaviorSubject();
  }

  set(obj: any) {
    this.tabs.push(obj);
    this.tabsSubject.next(this.tabs);
  }

  get() {
    return this.tabsSubject.asObservable()
  }

  remove(_id: any) {
    this.removedTabID.next(_id); // set id of removed element

    var i = this.tabs.findIndex(t => t._id == _id);
    
    this.tabs.splice(i, 1)

    this.tabsSubject.next(this.tabs);
  }

  getRemovedTabID() {
    return this.removedTabID.asObservable()
  }
}
