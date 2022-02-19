import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  baseUrl: string = "http://localhost:3000/api/login";

  getStudentsList() {
    return this.http.get<User[]>('http://localhost:3000/api/users')
  }

  login(Email: string, Password: any) {
    let user = {
      Email: Email,
      Password: Password
    }
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.http.post(this.baseUrl, JSON.stringify(user), { headers: headers })
  }
  LogOut() {
    localStorage.removeItem('Authorization')
    this.Router.navigate(["/"]);
  }
  Rgister(newUser: User) {
    return this.http.post<User>("http://localhost:3000/api/register", newUser)
  }
  getUserById(Id: number) {
    return this.http.get<User>("http://localhost:3000/api/users" + '/edit' + Id)
  }

  updateUser(modifiedUser:User){
    return this.http.put<User>("http://localhost:3000/api/users",modifiedUser)
  }
  getToken() {
    return localStorage.getItem('Authorization')
  }

  isUserLoggedin() {
    let userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000
    } else {
      return false;
    }
  }
  getUserPayload() {
    let token = this.getToken();
    if (token) {
      let userpaylad = atob(token.split('.')[1])
      return JSON.parse(userpaylad)
    } else {
      return null;
    }
  }

  constructor(private http: HttpClient, private Router: Router) { }
}
