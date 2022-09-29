import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

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

  ngOnInit(): void {
  }

}
