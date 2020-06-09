import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';

import { environment } from 'src/environments/environment';

class UserResponse {
  user: User;
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  readonly URL = environment.apiUrl;

  currUserBehaviorSubject: BehaviorSubject<User> = new BehaviorSubject(new User());
  currUser: Observable<User>;

  constructor(private http: HttpClient) {

    this.currUserBehaviorSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currUser')))
    this.currUser = this.currUserBehaviorSubject.asObservable();
  }

  login(email: string, password: string) {
    return this.http.post(`${URL}/users/login`, { email, password })
      .pipe(
        map((resp: UserResponse) => {

          var user = resp.user as User

          localStorage.setItem("currUser", JSON.stringify(user));
          this.currUserBehaviorSubject.next(user);

          return user
        }))
  }

  register(user: User) {
    return this.http.post(`${URL}/users`, user)
  }

  update(_id: string, data: User) {
    return this.http.put(`${URL}/users/${_id}`, data)
      .pipe(
        map((user: User) => {
          localStorage.setItem("currUser", JSON.stringify(user));
          this.currUserBehaviorSubject.next(user)
        }))

  }

  uploadProfileImage(_id: string, imageData: FormData) {
    console.log('imageData ', imageData);

    return this.http.post(`${URL}/images/profImages/${_id}`, imageData).
      pipe(
        map(resp => {
          var image = `${URL}/images/profImage/` + resp[0].filename;

          this.saveToLocalstorage(image);
          return image;
        }))

  }

  logout() {
    localStorage.removeItem('currUser');
    this.currUserBehaviorSubject.next(null)
  }

  saveToLocalstorage(image) {
    var _local = JSON.parse(localStorage.getItem("currUser"));
    _local['image'] = image;
    localStorage.setItem("currUser", JSON.stringify(_local));
    this.currUserBehaviorSubject.next(_local);
  }

}
