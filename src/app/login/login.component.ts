import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm!: FormGroup;
  errorMsg!: string;


  constructor(private UserService: UserAuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      "Email": new FormControl('', Validators.required),
      "Password": new FormControl('', Validators.required)
    })
  }

  get FormControl() {
    return this.LoginForm.controls;
  }

  OnLogin(data: any) {
    if (data.invalid) {
      alert('invalid login')
      return
    }
    let loginEmail = data.form.controls.Email.value;
    let loginPassword = data.form.controls.Password.value;

    this.UserService.login(loginEmail, loginPassword)
      .subscribe(result => {
        this.UserService.loggedIn.next(true)
        const ConvertResult = Object.values(result)
        const token = ConvertResult[0]
        localStorage.setItem('Authorization', token)
        this.UserService.loggedIn.next(true)
        this.router.navigate(['/userAuth'])

      }, error => {
        this.errorMsg = error.error
        // console.log(this.errorMsg)
        confirm(this.errorMsg)
      })
  }

}


