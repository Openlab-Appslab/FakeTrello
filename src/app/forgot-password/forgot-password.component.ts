import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  forgotPasswordGroup = new FormGroup({
    email: new FormControl('', Validators.required),
  }); 

  forgotPassword(){
    const email = this.forgotPasswordGroup.value.email;

    console.log(email);
    this.authService.forgotPassword(email).subscribe();
  }

}