import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
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

  currUserBehaviorSubject: BehaviorSubject<User> = new BehaviorSubject();
  currUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currUserBehaviorSubject.next(JSON.parse(localStorage.getItem('currUser')));
    this.currUser = this.currUserBehaviorSubject.asObservable();
  }

  login(email: string, password: string) {
    console.log('login, url',this.URL);
    
    return this.http.post(`${this.URL}/users/login`, { email, password })
      .pipe(
        map((resp: UserResponse) => {

          console.log('resp', resp);
          
          var user = resp.user as User

          localStorage.setItem("currUser", JSON.stringify(user));
          this.currUserBehaviorSubject.next(user);

          return user
        }))
  }

  register(user: User) {
    return this.http.post(`${this.URL}/users`, user)
  }

  update(_id: string, data: User) {
    return this.http.put(`${this.URL}/users/${_id}`, data)
      .pipe(
        map((user: User) => {
          localStorage.setItem("currUser", JSON.stringify(user));
          this.currUserBehaviorSubject.next(user)
        }))

  }

  uploadProfileImage(_id: string, imageData: FormData) {
    console.log('imageData ', imageData);

    return this.http.post(`${this.URL}/images/profImages/${_id}`, imageData).
      pipe(
        map((resp:any) => {
          console.log('RESPONSE ', resp);
         
          
          // var image = this.URL + resp.filename;
      
          this.saveToLocalstorage(resp.filename);
          return resp.filename;
        }))

  }

  logout() {
    localStorage.removeItem('currUser');
    this.currUserBehaviorSubject.next(null)
  }

  saveToLocalstorage(image) {
    console.log('i',image);
    
    var _local = JSON.parse(localStorage.getItem("currUser"));
    _local['image'] = image;
    localStorage.setItem("currUser", JSON.stringify(_local));
    this.currUserBehaviorSubject.next(_local);
  }

}
