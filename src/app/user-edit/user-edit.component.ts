import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  currentId!: number;
  errorMsg!: string;

  EditForm!: FormGroup;
  async OnEdit(data: any) {
    if (data.invalid) {
      alert('invalid data')
      return
    }
    let UserName = await data.form.controls.UserName.value;
    let Email = await data.form.controls.Email.value;
    let Password = await data.form.controls.Password.value;
    const modifiedUser: any = {
      UserID: this.currentId,
      UserName: UserName,
      Email: Email,
      Password: Password
    }

    this.UserService.updateUser(modifiedUser).subscribe(updateResult => {
      // console.log(updateResult)
      this.Router.navigate(['/userAuth'])
    }
      , error => {
        this.errorMsg = error.error
        // console.log(this.errorMsg)
        confirm(this.errorMsg)
      })
  }
  constructor(private UserService: UserAuthService,
    private Router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.currentId = param['id']
    })
    this.EditForm = new FormGroup({
      'UserName': new FormControl('', [Validators.required, Validators.minLength(4)]),
      'Email': new FormControl('', [Validators.required, Validators.email]),
      'Password': new FormControl('', [Validators.required])
    })
  }
  get FormControl() {
    return this.EditForm.controls;
  }
}
