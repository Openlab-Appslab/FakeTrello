import { Component } from '@angular/core';
import { ProfileService } from '../service/profile.service';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  passwordUpdateGroup = new FormGroup({
    password: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    newPasswordCheck: new FormControl('', Validators.required),
  });

  hide = true;
  hide2= true;
  hide3 = true;

  errorMessage: string;

  constructor(
    private profileService: ProfileService,
    private cookies: CookieService,
  ) {}

  
  changePassword() {
    const newPassword = this.passwordUpdateGroup.value.newPassword;

    console.log(newPassword);

    this.profileService.changePassword(newPassword).subscribe(response => {
      console.log(response, 'Password changed successfully');
      this.passwordUpdateGroup.setValue({
        password: '',
        newPassword: '',
        newPasswordCheck: ''
      });
    });
  }

  passwordsMatch(): boolean{
    if(this.passwordUpdateGroup.value.newPassword === this.passwordUpdateGroup.value.newPasswordCheck){
      return true;
    } else {
      return false;
    }
  }

  wrongPassword(): boolean{
    if(this.passwordUpdateGroup.value.password === this.cookies.get('password') || this.passwordUpdateGroup.value.password === ''){
      return true;
    } else {
      return false;
    }
  }
}