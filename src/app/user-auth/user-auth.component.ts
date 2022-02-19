import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  UserList: User[] = []

  constructor(private UserSerives: UserAuthService) { }

  ngOnInit(): void {
    this.UserSerives.getStudentsList().subscribe(UserList => {
      this.UserList = UserList
    })
  }

}
