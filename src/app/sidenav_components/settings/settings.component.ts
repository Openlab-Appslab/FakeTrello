import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileData } from 'src/app/model/profileData';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  previews: any;
  public profileData: ProfileData;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    
  ) { }

  ngOnInit(): void {
    this.getUserData();
  }

  profileUpdateGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    nickName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
  });

  sendUserInfo(){
    if(this.profileUpdateGroup.valid){

      console.log(this.profileUpdateGroup.value);

      const firstName = this.profileUpdateGroup.value.firstName;
      const lastName = this.profileUpdateGroup.value.lastName;
      const nickName = this.profileUpdateGroup.value.nickName;
      const phoneNumber = this.profileUpdateGroup.value.phoneNumber;

      this.profileService.addProfileData(firstName, lastName, nickName, phoneNumber)
        .subscribe(() => this.router.navigate(['/settings'])); 
    }
  }

  getUserData(): void{
    this.profileService.getProfileData()
      .subscribe(response => {
        this.profileData = response;
        this.profileUpdateGroup.patchValue({
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName,
          nickName: response.nickName,
          phoneNumber: response.phoneNumber,
        })
      })
  }

}
