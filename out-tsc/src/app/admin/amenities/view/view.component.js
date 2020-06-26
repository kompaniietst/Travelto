import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ViewAmenitiesComponent = class ViewAmenitiesComponent {
    constructor(admin) {
        this.admin = admin;
        this.amenities$ = this.admin.getAmenities();
    }
    ngOnInit() { }
};
ViewAmenitiesComponent = __decorate([
    Component({
        selector: 'app-view-amenities',
        templateUrl: './view.component.html',
        styleUrls: ['./view.component.scss']
    })
], ViewAmenitiesComponent);
export { ViewAmenitiesComponent };
//# sourceMappingURL=view.component.js.map