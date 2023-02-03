import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProfileData } from 'src/app/model/profileData';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profileData: ProfileData;

  constructor(
    private profileService: ProfileService,
    
  ) { }

  ngOnInit(): void {
    this.getUserData();
  }

  public getUserData(): void{ //getting all user listings list, the binding it to the model in html file
    this.profileService.getProfileData().subscribe( //subscribe waits for the response from the server and then executes the code inside the subscribe
      (response: ProfileData) => {
        this.profileData = response;
        console.log('my profileData');
        console.log(this.profileData);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
