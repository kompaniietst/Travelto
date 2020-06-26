import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
let HotelService = class HotelService {
    // private bookingSubject: BehaviorSubject<any>;
    // bookings: Observable<any>;
    // get bookingsValue() {
    // }
    constructor(http) {
        this.http = http;
        this.URL = environment.apiUrl;
        // this.hotelSubject = new BehaviorSubject(JSON.parse(localStorage.getItem("hotels")));
    }
    register(hotel) {
        return this.http.post(`${this.URL}/hotels`, hotel);
    }
    get() {
        return this.http.get(`${this.URL}/hotels`);
    }
    getHotelBy(_id) {
        return this.http.get(`${this.URL}/hotels/${_id}`);
    }
    editHotel(_id, hotel) {
        return this.http.put(`${this.URL}/hotels/${_id}`, hotel);
    }
    gethotelInfoByRoom(_id) {
        console.log('id', _id);
        return this.http.get(`${this.URL}/hotelInfoByRoom/${_id}`);
    }
};
HotelService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], HotelService);
export { HotelService };
//# sourceMappingURL=hotel.service.js.map