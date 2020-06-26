import { __decorate } from "tslib";
import { Component } from '@angular/core';
let RoomComponent = class RoomComponent {
    constructor(route, admin, alert) {
        this.route = route;
        this.admin = admin;
        this.alert = alert;
        this.id = this.route.snapshot.params.id;
        this.loading = true;
        // // breadcrumbs: string[] = ['All hotels', 'Hotel preview'];
        // amenities: Amenity[];
        // // mapLat;
        // // mapLng;
        // // markers = [];
        this.carouselConfig = {
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: true,
            arrows: true
        };
        this.admin
            .getRoomBy(this.id)
            .subscribe((r) => {
            this.room = r;
            console.log('Room', this.room);
            this.loading = false;
            this.getHotelInfo(r.hotel_id);
        }, err => this.alert.error(err.error));
    }
    ngOnInit() { }
    getHotelInfo(hotel_id) {
        this.admin
            .gethotelInfoByRoom(hotel_id)
            .subscribe((resp) => {
            this.hotel = resp;
            console.log('room by hotel', resp);
        }, error => {
            console.log(error);
        });
    }
    trackById(index, item) {
        return item.id;
    }
};
RoomComponent = __decorate([
    Component({
        selector: 'app-room',
        templateUrl: './room.component.html',
        styleUrls: ['./room.component.scss']
    })
], RoomComponent);
export { RoomComponent };
//# sourceMappingURL=room.component.js.map