import { __decorate } from "tslib";
import { Component } from '@angular/core';
let FilterTabsComponent = class FilterTabsComponent {
    constructor(filterTabsService) {
        this.filterTabsService = filterTabsService;
    }
    ngOnInit() {
        this.filterTabs = this.filterTabsService.get();
        this.filterTabsService.get()
            .subscribe(x => console.log(x));
    }
    removeTab(_id) {
        this.filterTabsService.remove(_id);
    }
    trackById(index, item) {
        return item.id;
    }
};
FilterTabsComponent = __decorate([
    Component({
        selector: 'app-filter-tabs',
        templateUrl: './filter-tabs.component.html',
        styleUrls: ['./filter-tabs.component.scss']
    })
], FilterTabsComponent);
export { FilterTabsComponent };
//# sourceMappingURL=filter-tabs.component.js.map