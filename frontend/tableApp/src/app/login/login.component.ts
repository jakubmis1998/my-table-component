import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent {

  userData: FormGroup = this.fb.group({
    username: [''],
    password: [''],
  });

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  signIn() {
    this.userService.login(this.userData.value).subscribe(
      data => {
        this.userService.storeToken(data.token);
        this.userService.loggedUser = this.userData.value['username'];
        this.router.navigate(['/table']);
        this.toastr.success('Hello ' + this.userData.value['username'] + '!', 'Success');
      },
      error => {
        Object.keys(error.error).forEach(keyError => {
          this.toastr.error(error.error[keyError], 'Error');
        });
      }
    );
  }

}
