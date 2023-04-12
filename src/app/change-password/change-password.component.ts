import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../service/profile.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;

  constructor(private http: HttpClient,  private profileService: ProfileService) {}

  
  changePassword() {
    const newPassword = this.newPassword;
    this.profileService.changePassword(newPassword).subscribe(response => {
      console.log('Password changed successfully');
    });
  }

}