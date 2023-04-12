import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  responseData: any;
  componentName = "test";

  errorMessage = '';

  hide = true;

  constructor(
    private readonly router: Router,
    private authService: AuthService,

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

  login(): void {
    if (this.loginGroup.valid) {
      const email = this.loginGroup.value.email;
      const password = this.loginGroup.value.password;
      this.authService.login(email, password)
        .subscribe(() => this.router.navigateByUrl('/boards'),
          (error) => {
            if(error.status === 401){
              this.errorMessage = 'Bad Credentials!';
              console.log("Bad credentials");
            }
            if(error.status === 111){
              this.errorMessage = 'Wrong password!';
              console.log("Bad credentials - email");
            }
            if(error.status === 222){
              this.errorMessage = 'Wrong email!';
              console.log("Bad credentials - email");
            }
          });
    }
  }

  ngOnInit(): void {
  }
}
