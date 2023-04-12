import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  verifToken: string;

  ngOnInit(): void {
    this.verifToken = String(this.route.snapshot.paramMap.get('code')); // Store the verification token
  }

  resetPasswordGroup = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  

  submitNewPassword() {
    const newPassword = this.resetPasswordGroup.value.newPassword;
    console.log(this.verifToken);

    this.authService.resetPassword(newPassword, this.verifToken);
  }

  passwordsMatch(){
    if(this.resetPasswordGroup.value.newPassword === this.resetPasswordGroup.value.newPasswordCheck){
      return true;
    } else {
      return false;
    }
  }

}
