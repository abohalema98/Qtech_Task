import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isUserLogin!: Observable<boolean>;
  LoginStatus: boolean =false;
  token:any;

  loginStatus(){
   return this.UserService.getToken()
  }
  LogOut() {
    this.UserService.LogOut();
    window.location.href = "http://localhost:4200/login"
    // this.Router.navigate(['/login'])
  }

  constructor(private UserService: UserAuthService ,private Router:Router) { }

  ngOnInit(): void {
    this.LoginStatus = this.UserService.isUserLoggedin()
    this.token = this.UserService.getToken();

  }
}
