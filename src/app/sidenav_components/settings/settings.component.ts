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

  imageTest: string = '';

onFileChange(event: any) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageTest = reader.result as string;
      console.log(this.imageTest);
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  updateProfilePicture(){
    const userId = this.profileData.id;
    const image = this.imageTest;
    console.log(this.profileData.id);
    console.log(this.imageTest);

    this.profileService.profilePictureUpload(image, userId).subscribe(() => {
      this.message = 'Profile picture updated successfully';
    });
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

  deleteUser(){
    this.profileService.deleteUser()
      .subscribe(() => this.router.navigateByUrl('/login'));
  }

}
