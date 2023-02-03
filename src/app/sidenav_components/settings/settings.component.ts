import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileData } from 'src/app/model/profileData';
import { ProfileService } from 'src/app/service/profile.service';
import { UploadfileService } from 'src/app/service/upload.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  previews: any;
  public profileData: ProfileData;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private fileUploadService: UploadfileService,
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

  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File; // Variable to store file
  // file: File = null; 

  // On file Select
  onChange(event: any) {
    this.file = event.target.files[0];
}

// OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.fileUploadService.upload(this.file).subscribe(
        (event: any) => {
            if (typeof (event) === 'object') {

                // Short link via api response
                this.shortLink = event.link;

                this.loading = false; // Flag variable 
            }
        }
    );
  }

  test(){
    console.log("funguj");
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
