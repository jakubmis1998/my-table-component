import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent {

  logged: boolean = false;
  userData: FormGroup = this.fb.group({
    username: [''],
    password: [''],
    email: ['']
  });

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  signUp() {
    this.userService.register(this.userData.value).subscribe(
      data => {
        this.router.navigate(['/login']);
        this.toastr.success('User ' + this.userData.value['username'] + ' has been created!', 'Success');
      },
      error => {
        Object.keys(error.error).forEach(keyError => {
          this.toastr.error(error.error[keyError], 'Error');
        });
      }
    );
  }

}
