import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
let RoomService = class RoomService {
    constructor(http) {
        this.http = http;
        this.URL = environment.apiUrl;
    }
    register(room) {
        return this.http.post(`${this.URL}/rooms`, room);
    }
    get() {
        return this.http.get(`${this.URL}/rooms`);
    }
    getRoomsByHotel(id) {
        return this.http.get(`${this.URL}/roomsByHotel/${id}`);
    }
    editRoom(_id, room) {
        return this.http.put(`${this.URL}/rooms/${_id}`, room);
    }
    getRoomBy(_id) {
        return this.http.get(`${this.URL}/rooms/${_id}`);
    }
};
RoomService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], RoomService);
export { RoomService };
//# sourceMappingURL=room.service.js.map