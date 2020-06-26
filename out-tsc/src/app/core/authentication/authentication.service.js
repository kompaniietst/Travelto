import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
class UserResponse {
}
let AuthenticationService = class AuthenticationService {
    constructor(http) {
        this.http = http;
        this.URL = environment.apiUrl;
        this.currUserBehaviorSubject = new BehaviorSubject();
        // this.currUserBehaviorSubject = new BehaviorSubject<User[]>(JSON.parse(localStorage.getItem('currUser')))
        this.currUser = this.currUserBehaviorSubject.asObservable();
    }
    login(email, password) {
        console.log('url', this.URL);
        return this.http.post(`${this.URL}/users/login`, { email, password })
            .pipe(map((resp) => {
            var user = resp.user;
            localStorage.setItem("currUser", JSON.stringify(user));
            this.currUserBehaviorSubject.next(user);
            return user;
        }));
    }
    register(user) {
        return this.http.post(`${this.URL}/users`, user);
    }
    update(_id, data) {
        return this.http.put(`${this.URL}/users/${_id}`, data)
            .pipe(map((user) => {
            localStorage.setItem("currUser", JSON.stringify(user));
            this.currUserBehaviorSubject.next(user);
        }));
    }
    uploadProfileImage(_id, imageData) {
        console.log('imageData ', imageData);
        return this.http.post(`${this.URL}/images/profImages/${_id}`, imageData).
            pipe(map((resp) => {
            console.log('RESPONSE ', resp);
            var image = this.URL + resp.filename;
            this.saveToLocalstorage(image);
            return image;
        }));
    }
    logout() {
        localStorage.removeItem('currUser');
        this.currUserBehaviorSubject.next(null);
    }
    saveToLocalstorage(image) {
        console.log('i', image);
        var _local = JSON.parse(localStorage.getItem("currUser"));
        _local['image'] = image;
        localStorage.setItem("currUser", JSON.stringify(_local));
        this.currUserBehaviorSubject.next(_local);
    }
};
AuthenticationService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthenticationService);
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map