import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { delay } from 'rxjs/operators';
let AdminService = class AdminService {
    // private amenitiesSubject: BehaviorSubject<any>;
    // amenities: Observable<any>;
    constructor(http, hotelService, roomService) {
        // this.amenitiesSubject = new BehaviorSubject(this.getAmenities());
        // this.amenities = this.amenitiesSubject.asObservable();
        this.http = http;
        this.hotelService = hotelService;
        this.roomService = roomService;
        this.URL = environment.apiUrl;
    }
    registerHotel(hotel) {
        return this.hotelService.register(hotel)
            .pipe(delay(1500));
    }
    getHotels() {
        return this.hotelService.get();
    }
    getHotelBy(_id) {
        return this.hotelService.getHotelBy(_id);
    }
    editHotel(_id, hotel) {
        console.log('in serv', _id, hotel);
        return this.hotelService.editHotel(_id, hotel)
            .pipe(delay(1500));
    }
    gethotelInfoByRoom(_id) {
        console.log('id', _id);
        return this.hotelService.gethotelInfoByRoom(_id);
    }
    //--------------------------------------------------------
    registerAmenity(amenity) {
        return this.http
            .post(`${this.URL}/amenities`, amenity)
            .pipe(delay(1500));
    }
    getAmenities() {
        return this.http
            .get(`${this.URL}/amenities`);
    }
    editAmenity(_id, amenity) {
        return this.http.put(`${this.URL}/amenities/${_id}`, amenity);
    }
    //--------------------------------------------------------
    registerCity(city) {
        return this.http
            .post(`${this.URL}/cities`, city)
            .pipe(delay(1500));
    }
    getCities() {
        return this.http
            .get(`${this.URL}/cities`);
    }
    //--------------------------------------------------------
    registerRoom(room) {
        return this.roomService.register(room)
            .pipe(delay(1500));
    }
    editRoom(_id, room) {
        return this.roomService.editRoom(_id, room)
            .pipe(delay(1500));
    }
    getRooms() {
        return this.roomService.get()
            .pipe(delay(1500));
    }
    getRoomBy(_id) {
        return this.roomService.getRoomBy(_id);
    }
    getRoomsByHotel(id) {
        return this.roomService.getRoomsByHotel(id);
    }
    //--------------------------------------------------------
    uploadImages(path, imageData) {
        return this.http.post(`${this.URL}/images/${path}`, imageData)
            .pipe(delay(1500));
    }
};
AdminService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AdminService);
export { AdminService };
//# sourceMappingURL=admin.service.js.map