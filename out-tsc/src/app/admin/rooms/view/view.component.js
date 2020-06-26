import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ViewRoomsComponent = class ViewRoomsComponent {
    constructor(admin) {
        this.admin = admin;
        this.loading = true;
        this.rooms$ = this.admin.getRooms();
        this.admin.getRooms().subscribe(x => this.loading = false);
    }
    ngOnInit() {
    }
};
ViewRoomsComponent = __decorate([
    Component({
        selector: 'app-view-rooms',
        templateUrl: './view.component.html',
        styleUrls: ['./view.component.scss']
    })
], ViewRoomsComponent);
export { ViewRoomsComponent };
//# sourceMappingURL=view.component.js.map