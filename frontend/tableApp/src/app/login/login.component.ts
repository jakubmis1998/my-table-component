import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  register;

  ngOnInit(): void {
    this.register = {
      username: '',
      password: '',
      email: ''
    };
  }

  signUp() {

  }

}
