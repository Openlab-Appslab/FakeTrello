import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ProfileData } from '../model/profileData';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json', 
  })
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
    console.log("service works");

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
}
