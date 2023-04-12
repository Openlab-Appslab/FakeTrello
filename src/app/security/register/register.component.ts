import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hide = true;
  hide2= true;

  errorMessage = '';

  constructor(
    private authService: AuthService,
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

  register() {
    if(this.registerGroup.valid){
      const email = this.registerGroup.value.email;
      const password = this.registerGroup.value.password;
      console.log(this.registerGroup.value);
    
      this.authService.register(email, password)  
      .subscribe(
        () => this.authService.showRegisterVerifyialog(),
        (error) => {
          if(error.status === 400){
            this.errorMessage = 'User with this E-Mail already exists!';
            console.log("Bad credentials");
          }
        });
    }
  }

  passwordsMatch(){
    if(this.registerGroup.value.password === this.registerGroup.value.repeatPassword){
      return true;
    } else {
      return false;
    }
  }

  ngOnInit(): void {
  }
}

