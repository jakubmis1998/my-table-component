import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnDestroy {

  constructor(public userService: UserService) {}

  ngOnDestroy(): void {
    localStorage.removeItem('NAME');
    localStorage.removeItem('TOKEN');
  }

  // For date and time
  time = new Observable<string>(observer => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });

  getUsername() {
    return localStorage.getItem('NAME');
  }
}

