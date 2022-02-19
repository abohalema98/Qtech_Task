import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  RegisterForm!: FormGroup;
  errorMsg!: string;



  async OnRegister(data: any) {
    if (data.invalid) {
      alert('invalid data')
      return
    }
    let UserName = await data.form.controls.UserName.value;
    let Email = await data.form.controls.Email.value;
    let Password = await data.form.controls.Password.value;
    const newUser: any = {
      UserName: UserName,
      Email: Email,
      Password: Password
    }

    this.UserService.Rgister(newUser).subscribe(result => {
      this.Router.navigate(['/login'])
      // console.log(result)
    }, error => {
      this.errorMsg = error.error
      // console.log(this.errorMsg)
      confirm(this.errorMsg)
    })
  }
  constructor(private UserService: UserAuthService,
    private Router: Router) { }

  ngOnInit(): void {
    this.RegisterForm = new FormGroup({
      'UserName': new FormControl('', [Validators.required, Validators.minLength(4)]),
      'Email': new FormControl('', [Validators.required, Validators.email]),
      'Password': new FormControl('', [Validators.required])
    })
  }

  get FormControl() {
    return this.RegisterForm.controls;
  }

}
