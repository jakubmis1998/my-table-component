import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  userData;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userData = {
      username: '',
      password: '',
      email: ''
    };
  }

  signIn() {
    this.userService.login(this.userData).subscribe(
      data => {
        this.userService.storeToken(data.token);
        this.router.navigate(['/table']);
        this.toastr.success('Hello ' + this.userData.username + '!', 'Success');
      },
      error => {
        Object.keys(error.error).forEach(keyError => {
          this.toastr.error(error.error[keyError], 'Error');
        });
      }
    );
  }

}
