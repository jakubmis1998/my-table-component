import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  userData;
  logged: boolean = false;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userData = {
      username: '',
      password: '',
      email: ''
    };
  }

  signUp() {
    this.userService.register(this.userData).subscribe(
      data => {
        this.router.navigate(['/login']);
        this.toastr.success('User ' + data.username + ' has been created!', 'Success');
      },
      error => {
        Object.keys(error.error).forEach(keyError => {
          this.toastr.error(error.error[keyError], 'Error');
        });
      }
    );
  }

}
