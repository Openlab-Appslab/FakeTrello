import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private readonly router: Router,
    private _auth: AuthService,
  ) { }

  title = 'FakeTrello';

  firstName = "Jozko";
  lastName = "Tehla"

  element = false;
}
