import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ReversePipe } from 'src/app/pipes/reverse.pipe';
let ViewHotelsComponent = class ViewHotelsComponent {
    constructor(admin, route) {
        this.admin = admin;
        this.route = route;
        this.loading = true;
        this.hotels$ = this.admin.getHotels();
        this.admin.getHotels()
            .subscribe((x) => {
            this.loading = false;
        }, err => console.log(err));
    }
    ngOnInit() { }
};
ViewHotelsComponent = __decorate([
    Component({
        selector: 'app-view-hotels',
        templateUrl: './view.component.html',
        styleUrls: ['./view.component.scss'],
        providers: [{
                provide: ReversePipe
            }]
    })
], ViewHotelsComponent);
export { ViewHotelsComponent };
//# sourceMappingURL=view.component.js.map