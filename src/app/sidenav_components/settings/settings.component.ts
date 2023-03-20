import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileData } from 'src/app/model/profileData';
import { ProfileService } from 'src/app/service/profile.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public profileData: ProfileData;
  message: string = '';

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private modalService: NgbModal,

  ) { }

  ngOnInit(): void {
    this.getUserData();
  }

  profileUpdateGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    nickname: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
  });

  openDeleteModal(content: any) { //function for opening the delete modal
    this.modalService.open(content);
  }

  imageTest: File | null = null;

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.imageTest = event.target.files[0];
    }
  }

  updateProfilePicture() {
    if (this.imageTest) {
      console.log(this.imageTest, 'image before DB');
  
      this.profileService.profilePictureUpload(this.imageTest).subscribe(() => {
        this.message = 'Profile picture updated successfully';
        this.getUserData();
      });
    }
  }

  submit(){
    console.log(this.imageTest);
  }

  sendUserInfo(){
    if(this.profileUpdateGroup.valid){

      console.log(this.profileUpdateGroup.value);

      const firstName = this.profileUpdateGroup.value.firstName;
      const lastName = this.profileUpdateGroup.value.lastName;
      const nickname = this.profileUpdateGroup.value.nickname;
      const phoneNumber = this.profileUpdateGroup.value.phoneNumber;

      this.profileService.addProfileData(firstName, lastName, nickname, phoneNumber)
        .subscribe(() => this.router.navigate(['/settings'])); 
    }
  }

  getUserData(): void{
    this.profileService.getProfileData()
      .subscribe(response => {
        this.profileData = response;
        const test = this.profileData.profilePicture;
        console.log(this.profileData.profilePicture, 'profilePic from DB');
        console.log(this.profileData);
        this.profileUpdateGroup.patchValue({
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName,
          nickname: response.nickname,
          phoneNumber: response.phoneNumber,
        })
      })
  }

  //   getImage() {

  //   this.httpClient.get('http://localhost:8080/image/get/' + this.imageName)
  //     .subscribe(
  //       res => {
  //         this.retrieveResonse = res;
  //         this.base64Data = this.retrieveResonse.picByte;
  //         this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
  //       }
  //     );
  // }

  deleteUser(){
    this.profileService.deleteUser()
      .subscribe(() => this.router.navigateByUrl('/login'));
  }

}
