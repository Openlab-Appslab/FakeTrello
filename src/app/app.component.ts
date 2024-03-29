import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PomodoroComponent } from './pomodoro/pomodoro.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private readonly router: Router,
    private authService: AuthService,
  ) { }

  title = 'FakeTrello';

  firstName = "Jozko";
  lastName = "Tehla"

  element = false;

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  onCLickLogOut(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
