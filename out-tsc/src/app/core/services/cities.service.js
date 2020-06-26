import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
let CitiesService = class CitiesService {
    constructor(http) {
        this.http = http;
        this.URL = environment.apiUrl;
    }
    get() {
        return this.http.get(`${this.URL}/cities`);
    }
};
CitiesService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CitiesService);
export { CitiesService };
//# sourceMappingURL=cities.service.js.map