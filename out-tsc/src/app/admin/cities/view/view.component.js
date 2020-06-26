import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ViewCitiesComponent = class ViewCitiesComponent {
    constructor(admin) {
        this.admin = admin;
        this.cities$ = this.admin.getCities();
    }
    ngOnInit() { }
};
ViewCitiesComponent = __decorate([
    Component({
        selector: 'app-view-cities',
        templateUrl: './view.component.html',
        styleUrls: ['./view.component.scss']
    })
], ViewCitiesComponent);
export { ViewCitiesComponent };
//# sourceMappingURL=view.component.js.map