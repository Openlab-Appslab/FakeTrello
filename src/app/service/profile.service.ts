import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ProfileData } from '../model/profileData';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json', 
  })
};

const httpOptionsMultipart = {
  headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient,
    private cookies: CookieService,

  ) { }

  addProfileData(firstName: string, lastName: string, nickname: string, phoneNumber: number): Observable<any>{
    console.log(firstName, lastName, nickname, phoneNumber);
    console.log("addProfileData");

    return this.http.put('http://localhost:8080/editUser', {
      firstName,
      lastName,
      nickname,
      phoneNumber,
    }, httpOptions);
  }

  getProfileData(): Observable<ProfileData>{
    return this.http.get<ProfileData>('http://localhost:8080/getUserDetails');
  }

  deleteUser(): Observable<void>{
    return this.http.delete<void>('http://localhost:8080/deleteUser');   
  }

  // profilePictureUpload(image: string): Observable<any>{
  //   return this.http.put('http://localhost:8080/uploadProfilePicture', {
  //     image,
  //   }, httpOptions);
  // }
  // profilePictureUpload(image: string): Observable<any> {
  //   const params = new HttpParams().set('image', image);
  //   return this.http.put('http://localhost:8080/uploadProfilePicture', {}, { params });
  // }
  profilePictureUpload(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
  
    return this.http.put('http://localhost:8080/uploadProfilePicture', formData, httpOptionsMultipart);
  }
  changePassword(password: string): Observable<any> {
    const formData = new FormData();
    formData.append('password', password);
    console.log(password);
    return this.http.put('http://localhost:8080/changePassword', formData);
  }
}
