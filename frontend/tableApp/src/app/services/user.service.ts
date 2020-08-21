import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient, private router: Router) { }

  register(userData): Observable<any> {
    return this.http.post(this.baseUrl + '/users/', userData, { headers: this.httpHeaders });
  }

  login(userData): Observable<any> {
    return this.http.post(this.baseUrl + '/auth/', userData, { headers: this.httpHeaders });
  }

  logout() {
    localStorage.removeItem('NAME');
    localStorage.removeItem('TOKEN');
    this.router.navigate(['/login']);
  }

  loggedIn() {
    return localStorage.getItem('TOKEN') ? true : false;
  }

  storeToken(token, username) {
    localStorage.setItem('NAME', username);
    localStorage.setItem('TOKEN', token);
  }
}
