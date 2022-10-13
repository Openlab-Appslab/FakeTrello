import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private _auth: AuthService,
    private router: Router,

  ) { }

  registerGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    repeatPassword: new FormControl('', Validators.required)
  });

  test(){
    const email = this.registerGroup.value.email;
    const password = this.registerGroup.value.password;
    const repeatPassword = this.registerGroup.value.repeatPassword;
    console.log(email, password, repeatPassword);
  }

  loginUser() {
    const email = this.registerGroup.value.email;
    const password = this.registerGroup.value.password;

    console.log(email, password);
    this._auth.loginUser(email, password)
      .subscribe(() => this.router.navigateByUrl('/login'));
  }

  ngOnInit(): void {
  }

}
