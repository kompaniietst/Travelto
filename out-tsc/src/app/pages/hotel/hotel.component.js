import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CustomCurrencyPipe } from 'src/app/pipes/customCurrency.pipe';
let HotelComponent = class HotelComponent {
    constructor(route, admin, alert) {
        this.route = route;
        this.admin = admin;
        this.alert = alert;
        this.id = this.route.snapshot.params.id;
        this.loading = true;
        // mapLat;
        // mapLng;
        // markers = [];
        // loading = true;
        this.needCountSlides = true;
        this.carouselConfig = {
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            arrows: true
        };
        console.log(this.id);
        this.admin
            .getHotelBy(this.id)
            .subscribe((h) => {
            this.hotel = h;
            console.log('HOTEl', this.hotel);
            this.loading = false;
        }, err => this.alert.error(err.error));
        this.admin.getAmenities()
            .subscribe((x) => this.amenities = x);
    }
    ngOnInit() {
        this.rooms$ = this.admin.getRoomsByHotel(this.id);
        this.admin.getRoomsByHotel(this.id)
            .subscribe(r => console.log('after r', r), er => console.log(er));
    }
    ifActiveAmenity(_id) {
        return this.hotel.amenities.some(a => a._id == _id);
    }
    trackById(index, item) {
        return item.id;
    }
};
HotelComponent = __decorate([
    Component({
        selector: 'app-hotel',
        templateUrl: './hotel.component.html',
        styleUrls: ['./hotel.component.scss'],
        providers: [CustomCurrencyPipe]
    })
], HotelComponent);
export { HotelComponent };
//# sourceMappingURL=hotel.component.js.map