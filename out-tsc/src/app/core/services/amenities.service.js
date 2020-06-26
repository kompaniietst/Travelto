import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
let AmenitiesService = class AmenitiesService {
    constructor(http) {
        this.http = http;
        this.URL = environment.apiUrl;
    }
    get() {
        return this.http.get(`${this.URL}/amenities`);
    }
};
AmenitiesService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AmenitiesService);
export { AmenitiesService };
//# sourceMappingURL=amenities.service.js.map