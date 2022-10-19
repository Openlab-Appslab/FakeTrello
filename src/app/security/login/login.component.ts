import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private _auth: AuthService,

  ) { }

  loginGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  test(){
    const email = this.loginGroup.value.email;
    const password = this.loginGroup.value.password;
    console.log(email, password);
  }

  login() {
    const email = this.loginGroup.value.email;
    const password = this.loginGroup.value.password;

    console.log(email, password);

    this._auth.login(email, password) 
    .subscribe(() => this.router.navigateByUrl('/workspace'));
  }

  ngOnInit(): void {
  }
}
