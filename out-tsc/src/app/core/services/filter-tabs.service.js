import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
let FilterTabsService = class FilterTabsService {
    constructor() {
        this.tabs = [];
        this.tabsSubject = new BehaviorSubject();
        this.removedTabID = new BehaviorSubject();
    }
    set(obj) {
        this.tabs.push(obj);
        this.tabsSubject.next(this.tabs);
    }
    get() {
        return this.tabsSubject.asObservable();
    }
    remove(_id) {
        this.removedTabID.next(_id);
        var i = this.tabs.findIndex(t => t._id == _id);
        this.tabs.splice(i, 1);
        this.getRemovedTabID().subscribe(y => console.log('y', y));
        // this.tabs.push(obj);
        // this.tabsSubject.next(this.tabs);
    }
    getRemovedTabID() {
        return this.removedTabID.asObservable();
    }
};
FilterTabsService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], FilterTabsService);
export { FilterTabsService };
//# sourceMappingURL=filter-tabs.service.js.map